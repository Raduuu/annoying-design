<template>
  <form @submit.prevent="handleSubmit">
    <p class="helper">{{ helperText }}</p>
    <Input 
      v-model="inputValue" 
      @handle-input="handleInput" 
      class="form-input"
      @paste.prevent
    />
    <Button
      :style="{ position: 'relative', left: `${posX}px`, top: `${posY}px` }"
      class="bg-red-500 text-white px-4 py-2 rounded"
      @hover="handleHover"
      :disabled="inputValue === 'Type here...'"
    >
      Submit
    </Button>

    <ModalError ref="errorModalRef" :show-error="showErrorModal" @close-error-modal="closeErrorModal" />
  </form>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import { shiftLastChar } from '../../utils/index';
import Button from '../Button/index.vue';
import Input from '../Input/index.vue';
import ModalError from '../ModalError/index.vue';

let inputValue = ref('Type here...');

let showErrorModal = ref(false);

let failCount = ref(0);
let helperText = ref('Hint: HCL is awesome');

const posX = ref(0);
const posY = ref(0);
const dodgeCount = ref(0);
const maxDodges = Math.random() * 10;

const correctPhrase = 'HCL is awesome';

const errorModalRef = ref<InstanceType<typeof ErrorModal> | null>(null);

const gsap = (window as any).gsap;
  
watch(() => showErrorModal.value, (val) => {
  if (val) {
    nextTick(() => {
      if (errorModalRef.value && errorModalRef.value.modalRef) {
        const modalEl = errorModalRef.value.modalRef;

        // GSAP animation
        gsap.from(modalEl, {
          y: -200,
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "bounce.out"
        });

        gsap.to(modalEl, {
          x: 20,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });
  }
});

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  let val = target.value;

  if (val.length > inputValue.value.length) {
    const lastChar = val[val.length - 1];
    inputValue.value = val.slice(0, -1) + shiftLastChar(lastChar);
  } else {
    inputValue.value = val;
  }

  target.value = inputValue.value;
}

function submit(inputText: string): {success: boolean; message: string} | undefined {
  try {
    if (inputText.toLowerCase() === correctPhrase.toLowerCase()) {
      return { success: true, message: "Success!" };
    } else {
      failCount.value++;

      if (failCount.value === 1) {
        return { success: false, message: "Nope! Hint: maybe letters aren't what they seem..." };
      } else if (failCount.value === 2) {
        return { success: false, message: "Wrong again. Hint: think +2." };
      } else if (failCount.value >= 5) {
        const reveal = correctPhrase.slice(0, failCount.value);
        showErrorModal.value = true;
        return { success: false, message: `Still wrong. Correct phrase starts with: "${reveal}"` };
      }
    }
    return { success: false, message: "😈 Try again!" };
  } catch(e) {
    console.log('woops', e);
  }
}

function handleSubmit(ev: Event) {
  ev.preventDefault();

  const result = submit(inputValue.value);
  helperText.value = result!.message;
  if (result!.success) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const emoji = "💎";
    for (let i = 0; i < 50; i++) {
      const el = document.createElement("div");
      el.innerText = emoji;
      el.style.position = "fixed";
      el.style.left = `${centerX}px`;
      el.style.top = `${centerY}px`;
      el.style.fontSize = `${Math.random() * 24 + 16}px`;
      document.body.appendChild(el);

      gsap.to(el, {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 5,
        ease: "power1.out",
        onComplete: () => el.remove()
      });
    }
  }
}

function handleHover() {
  if (dodgeCount.value < maxDodges) {
    posX.value = Math.floor(Math.random() * 100);
    posY.value = Math.floor(Math.random() * 100);
    dodgeCount.value++;
  }
}

function closeErrorModal() {
  showErrorModal.value = false;
  posX.value = 0;
  posY.value = 0;
}
</script>

<style scoped>
.helper {
  color: red;
  margin-bottom: 8px;
}

.form-input {
  margin-right: 10px;
  line-height: 42px;
  padding-left: 0.5rem;
  border-radius: 4px;
  min-width: 300px;
  font-style: italic;
  color: gray;
  outline: none;
}
</style>