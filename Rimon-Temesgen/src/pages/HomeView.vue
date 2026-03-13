<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Sends the user from the home page to the registration page.
const goToRegistration = () => {
  router.push('/registration')
}
</script>

<template>
  <main class="home-view">
    <section class="hero-card">
      <div class="logo-wrap">
        <img src="/fca-logo.jpg" alt="FCA logo" class="logo-image" />
      </div>
      <h1 class="title">Refugee Support Program</h1>
      <button type="button" class="register-button" @click="goToRegistration">Register</button>
    </section>
  </main>
</template>

<style scoped>
/* Simple landing page with logo, title, and one button. */
.home-view {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #99cc32;
  padding: 24px;
  font-family: 'Arial Narrow', Arial, sans-serif;
}

.hero-card {
  width: min(100%, 520px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-wrap {
  width: 180px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  margin-bottom: 22px;
}

.logo-image {
  width: 130px;
  object-fit: contain;
}

.title {
  margin: 0;
  color: #fff;
  font-family: 'Agency FB', 'Arial Narrow', Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  margin-bottom: 28px;
}

.register-button {
  width: min(100%, 320px);
  border: none;
  border-radius: 6px;
  background: #f4f4f4;
  color: #99cc32;
  font-family: 'Arial Narrow', Arial, sans-serif;
  font-size: 1.5rem;
  padding: 18px 24px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.22);
  cursor: pointer;
}

.register-button:hover {
  background: #ebf4d0;
  color: #385723;
}

@media (max-width: 480px) {
  /* Small screen adjustments for phones. */
  .logo-wrap {
    width: 150px;
  }

  .logo-image {
    width: 108px;
  }

  .title {
    font-size: 1.6rem;
    white-space: normal;
  }

  .register-button {
    font-size: 1.25rem;
    padding: 16px 20px;
  }
}
</style>
