<template>
  <NuxtLoadingIndicator color="var(--brand)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100%;
}

* {
  box-sizing: border-box;
}

body {
  color: var(--text);
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

a {
  text-decoration: none;
  color: var(--text);
}

p,
h1,
h2,
h3,
h4 {
  padding: 0;
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
}

button {
  all: unset;

  &:focus {
    outline: 1px solid var(--brand);
  }

  &:focus {
    outline-offset: 0.2rem;
  }

  &:focus-visible {
    transition: outline-offset 75ms ease-out;
  }
}

.dialog-container-size {
  width: 100%;
  max-width: 60%;
}

.new-email-content {
  height: 100%;
  padding: 16px 0px;

  &:focus {
    outline: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    padding: 6px 0px;
  }

  p {
    padding: 4px 0px;
  }

  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }
}

:root {
  --br-small: 4px;
  --br-medium: 6px;
  --br-large: 8px;

  --bg-contrast: #141414;
  --text-light-contrast: #a8a8a8;
  --divider-contrast: #222222;

  --text: #151515;
  --text-secondary: #242424;
  --text-light: #5e5e5e;

  --brand-bg: #f2f2f2;
  --brand: #ed6aba;

  --divider: #e8e8e8;
  --hover: rgba(0, 0, 0, 0.04);

  --error-color: #bb2222;

  --shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
</style>
