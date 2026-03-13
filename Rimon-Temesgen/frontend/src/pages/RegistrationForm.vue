<script setup>
import { reactive, ref } from 'vue'
import RegistrationBrandPanel from '../components/registration/RegistrationBrandPanel.vue'
import RegistrationGenderField from '../components/registration/RegistrationGenderField.vue'
import RegistrationSelectField from '../components/registration/RegistrationSelectField.vue'
import RegistrationSuccessBanner from '../components/registration/RegistrationSuccessBanner.vue'
import RegistrationTextField from '../components/registration/RegistrationTextField.vue'
import { saveBeneficiary } from '../services/beneficiaryApi'

// These arrays control what fields and dropdown options appear on the form.
const textFields = [
  { key: 'firstName', label: 'First Name', placeholder: 'Enter your First name' },
  { key: 'lastName', label: 'Last name', placeholder: 'Enter your Last name' },
  { key: 'dateOfBirth', label: 'Date of birth', placeholder: 'YYYY / MM / DD' },
  { key: 'placeOfBirth', label: 'Place of Birth', placeholder: 'Enter your place of residence' },
  { key: 'settlementDate', label: 'Date of joining Settlement camp', placeholder: 'YYYY / MM / DD' },
]

const selectFields = [
  {
    key: 'nationality',
    label: 'Nationality',
    placeholder: '-- Select Nationality --',
    options: ['Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandese', 'Somali', 'South Sudanese'],
  },
  {
    key: 'maritalStatus',
    label: 'Marital status',
    placeholder: '-- Select Marital status --',
    options: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
  },
  {
    key: 'settlementCamp',
    label: 'Settlement camp',
    placeholder: '-- Select settlement camp --',
    options: [
      'Gulu settlement camp',
      'Arua settlement camp',
      'Mbarara settlement camp',
      'Kasese settlement camp',
      'Busia settlement camp',
      'Mbale settlement camp',
      'Kigezi settlement camp',
    ],
  },
]

const createInitialForm = () => ({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  placeOfBirth: '',
  gender: 'female',
  nationality: '',
  maritalStatus: '',
  settlementCamp: '',
  settlementDate: '',
})

const form = reactive(createInitialForm())
const touched = reactive(Object.fromEntries([...textFields, ...selectFields].map(({ key }) => [key, false])))
const submitted = ref(false)
const successMessage = ref('')
const serverError = ref('')
const isSaving = ref(false)
const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,}$/

// Converts a typed date string like 2026 / 03 / 13 into a real Date object.
const parseDate = (value) => {
  const match = value.trim().match(/^(\d{4})\s*\/\s*(\d{2})\s*\/\s*(\d{2})$/)
  if (!match) return null

  const [, year, month, day] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))

  return date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day)
    ? date
    : null
}

const registrationDate = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

// Date of birth must be before the registration date.
const isBeforeRegistrationDate = (value) => {
  const date = parseDate(value)
  if (!date) return false

  return date < registrationDate()
}

// Settlement date can be the same day as registration or after it.
const isOnOrAfterRegistrationDate = (value) => {
  const date = parseDate(value)
  if (!date) return false

  return date >= registrationDate()
}

// All validation messages are decided here so they are easy to edit later.
const getErrorMessage = (fieldName) => {
  const value = form[fieldName]

  if (fieldName === 'firstName' || fieldName === 'lastName') {
    if (!value.trim()) return 'This field is required'
    if (!namePattern.test(value.trim())) return 'Invalid field'
    return ''
  }

  if (fieldName === 'dateOfBirth') {
    if (!value.trim()) return 'This field is required'
    if (!isBeforeRegistrationDate(value)) return 'Invalid field'
    return ''
  }

  if (fieldName === 'placeOfBirth') {
    if (!value.trim()) return 'This field is required'
    if (value.trim().length < 3) return 'Invalid field'
    return ''
  }

  if (fieldName === 'nationality' || fieldName === 'maritalStatus' || fieldName === 'settlementCamp') {
    if (!value) return 'This field is required'
    return ''
  }

  if (fieldName === 'settlementDate') {
    if (!value.trim()) return 'This field is required'
    if (!isOnOrAfterRegistrationDate(value)) return 'Invalid field'
    return ''
  }

  return ''
}

// A field only shows red after submit or after the user has touched it.
const hasError = (fieldName) => {
  return (submitted.value || touched[fieldName]) && getErrorMessage(fieldName) !== ''
}

const errorText = (fieldName) => {
  if (hasError(fieldName)) return getErrorMessage(fieldName)
  return ' '
}

const touch = (key) => {
  touched[key] = true
}

// This brings the whole form back to its first empty state.
const resetForm = () => {
  Object.assign(form, createInitialForm())
  Object.keys(touched).forEach((key) => {
    touched[key] = false
  })
  submitted.value = false
}

// We only reset the form after the success message is closed.
const closeSuccessMessage = () => {
  successMessage.value = ''
  resetForm()
}

// When the user clicks Register, we check every field before showing success.
const handleSubmit = async () => {
  successMessage.value = ''
  serverError.value = ''
  submitted.value = true
  Object.keys(touched).forEach(touch)

  for (const fieldName of Object.keys(touched)) {
    if (getErrorMessage(fieldName)) {
      return
    }
  }

  try {
    isSaving.value = true
    const response = await saveBeneficiary({ ...form })
    successMessage.value = response.data.message || 'Beneficiary registered successfully'
  } catch (error) {
    serverError.value = error.response?.data?.message || 'Failed to connect to the backend'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <main class="registration-page">
    <RegistrationBrandPanel />

    <section class="form-panel">
      <form class="registration-form" @submit.prevent="handleSubmit">
        <h2 class="form-title">BENEFICIARY REGISTRATION FORM</h2>

        <RegistrationSuccessBanner
          v-if="successMessage"
          :message="successMessage"
          @close="closeSuccessMessage"
        />

        <p v-if="serverError" class="form-error-message">{{ serverError }}</p>

        <div class="field-grid">
          <RegistrationTextField
            v-for="field in textFields.slice(0, 4)"
            :key="field.key"
            v-model="form[field.key]"
            :label="field.label"
            :placeholder="field.placeholder"
            :error="errorText(field.key)"
            :invalid="hasError(field.key)"
            required
            @blur="touch(field.key)"
          />

          <RegistrationGenderField v-model="form.gender" />

          <RegistrationSelectField
            v-for="field in selectFields"
            :key="field.key"
            v-model="form[field.key]"
            :label="field.label"
            :placeholder="field.placeholder"
            :options="field.options"
            :error="errorText(field.key)"
            :invalid="hasError(field.key)"
            required
            @blur="touch(field.key)"
          />

          <RegistrationTextField
            v-model="form.settlementDate"
            :label="textFields[4].label"
            :placeholder="textFields[4].placeholder"
            :error="errorText('settlementDate')"
            :invalid="hasError('settlementDate')"
            required
            @blur="touch('settlementDate')"
          />
        </div>

        <div class="actions">
          <button type="submit" class="submit-button" :disabled="isSaving">
            {{ isSaving ? 'Saving...' : 'Register' }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
.form-error-message {
  margin: 0 0 8px;
  color: red;
  text-align: center;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: wait;
}
</style>
