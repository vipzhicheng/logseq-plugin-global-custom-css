import '@logseq/libs';
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

function createModel() {

  return {
    openModal() {
      logseq.showMainUI();
    }
  }
}

async function triggerBlockModal() {
  createModel().openModal()
}

const main = async () => {
  createApp(App).mount('#app')
  logseq.provideModel(createModel())
  logseq.Editor.registerSlashCommand('Test', triggerBlockModal)
  logseq.Editor.registerBlockContextMenuItem('Test', triggerBlockModal)

  logseq.App.registerUIItem('pagebar', {
    key: 'logseq-plugin-starter-vite-tailwindcss-pagebar',
    template: `
      <a data-on-click="openModal" class="button" title="Open modal" style="font-size: 18px">
        P
      </a>
    `,
  });

  logseq.App.registerUIItem('toolbar', {
    key: 'logseq-plugin-starter-vite-tailwindcss-toolbar',
    template: `
      <a class="button" data-on-click="openModal" title="Open modal" style="font-size: 18px">
        T
      </a>
    `,
  })

  document.addEventListener('click', (e) => {
    logseq.hideMainUI();
  })

}


logseq.ready().then(main).catch(console.error);