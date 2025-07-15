import { extensionsPage, getExtension, removeExtension, extensions, toggle, activeExtensions, inActiveExtension, changeImage, changeTheme } from "./data/extensions.js";

extensionsPage().then(()=>{
loadPage(extensions);
});

function loadPage (extensionData){
let pageHtml = '';
    extensionData.forEach((extensionInfo)=>{
     pageHtml+=`
  <div class="extension-card">
          <div class="extension-content">
            <img src="${extensionInfo.logo}" alt="">
            <div class="extension-subject">
              <p class="extension-name">
                ${extensionInfo.name}
              </p>
              <p class="extension-description">
                ${extensionInfo.description}
              </p>
            </div>
          </div>
          <div class="extension-status-row">
            <button class="remove-button js-remove-button" type="button"
            data-extension-name="${extensionInfo.name}">
               Remove
            </button>
            <label class="toggle-switch">
              <input type="checkbox" 
              ${extensionInfo.isActive?'checked':''} 
              tabindex="-1"
              class="js-toggle-input"
              data-extension-name="${extensionInfo.name}">
              <span class="slider" tabindex="0"></span>
            </label>
          </div>
        </div>`
  });
  document.querySelector('.js-extension-container').innerHTML=pageHtml;
  
  document.querySelectorAll('.js-toggle-input').forEach((toggleSwitch)=>{
    toggleSwitch.addEventListener('click', ()=>{
      const extensionName = toggleSwitch.dataset.extensionName;
      const matched = getExtension(extensionName);
       toggle(matched);
    });
  });

  document.querySelectorAll('.js-remove-button').forEach((removeButton)=>{
    removeButton.addEventListener('click',()=>{
      const extensionName = removeButton.dataset.extensionName;
      const matched = getExtension(extensionName);
      removeExtension(matched);
      loadPage(extensions);
    });
  });
}
 document.querySelector('.js-all-button').addEventListener('click', ()=>{
    loadPage(extensions);
  });

  document.querySelector('.js-active-button').addEventListener('click', ()=>{
    const active = activeExtensions();
    loadPage(active);
  });

  document.querySelector('.js-inactive-button').addEventListener('click', ()=>{
    const inactive = inActiveExtension();
    loadPage(inactive);
  });

  document.querySelectorAll('.js-control-button').forEach((controlButton)=>{
    controlButton.addEventListener('click', ()=>{
      document.querySelectorAll('.js-control-button').forEach((btn)=>{
        btn.classList.remove('selected');
      });
      
      controlButton.classList.add('selected');
      controlButton.blur();
    })
  });

  document.querySelector('.js-mode-button').addEventListener('click',()=>{
    changeImage();
    changeTheme();
  });

  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('.js-all-button')?.click();
  })