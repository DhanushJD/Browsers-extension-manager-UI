export let extensions = JSON.parse(localStorage.getItem('extensions'))|| [];

export async function extensionsPage (){
  if(extensions.length > 0){
    return extensions;
  }
  const response = await fetch('scripts/data/data.json');

  const  data = await response.json();
  extensions = data;
  saveToStorage();
  return extensions;
}

export function saveToStorage (){
  localStorage.setItem('extensions', JSON.stringify(extensions));
}
export function getExtension (extensionName){
  let matched;
  extensions.forEach((extensionInfo)=>{
    if(extensionName === extensionInfo.name){
      matched = extensionInfo;
    };
  });
  return matched;
  }

export function removeExtension(matched){
    let newExtension = [];
   extensions.forEach((extensionInfo)=>{
    if(matched.name !== extensionInfo.name){
      newExtension.push(extensionInfo);
    }
   });
    extensions = newExtension;
    saveToStorage();
  }

  export function toggle(matched){
      if(matched.isActive){
        matched.isActive = false;
      }else{
        matched.isActive = true;
      }
      saveToStorage();
  }
  
  export function activeExtensions (){
    const active = extensions.filter((extensionInfo)=>
      extensionInfo.isActive
  );
  return active;
  }

  export function inActiveExtension (){
    const inActive = extensions.filter((extensionInfo)=>!extensionInfo.isActive);
    return inActive;
  }

  export function changeImage (){
    const modeImg = document.querySelector('.js-mode-img');
    modeImg.src = modeImg.src.includes('assets/images/icon-sun.svg')? 'assets/images/icon-moon.svg' : 'assets/images/icon-sun.svg';
  }

  export function changeTheme (){
    const link1 = document.getElementById('general');
    link1.href = link1.href.includes('styles/dark/general.css')? 'styles/light/general-light.css':'styles/dark/general.css';

    const link2 = document.getElementById('header');
    link2.href = link2.href.includes('styles/dark/header.css')?'styles/light/header-light.css':'styles/dark/header.css';

    const link3 = document.getElementById('main');
    link3.href = link3.href.includes('styles/dark/main.css')?'styles/light/main-light.css':'styles/dark/main.css'
  }