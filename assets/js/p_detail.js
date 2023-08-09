var subImages = document.querySelectorAll('.sub_l_2 img');

subImages.forEach( subImage =>{
    subImage.onmouseover = function(){
        subImage.style.border = '2px solid orangered';
    }
    subImage.onmouseout = function(){
        subImage.style.border = '';
    }
});

const subL1 = document.querySelector('.sub_l_1 img');
const subL2Images = document.querySelectorAll('.sub_l_2 img');

subL2Images.forEach(function(active){
    active.addEventListener('mouseover', ()=>{
        subL1.src = active.src;
        // subL1.classList.add('hidden');
    })
})

// subL2Images.forEach(function(move){
//     move.addEventListener('mouseout', ()=>{
//         // window.location.reload();
//     })
// })


///// 1.getData
// 2. find id 
// 3. display into detail page 


const mockAPI = "https://run.mocky.io/v3/ca336eb7-0bdf-4252-ad0d-ceedab2c5309";

const displayTitle = document.querySelector('.title #b');
const displayPriceOld = document.querySelector('.price #x');
const displayPrice = document.querySelector('.price #y');
const displayImg = document.querySelector('.sub_l_1');

(async function FakeAPI () {
    const getData = await fetch(mockAPI);
    const data = await getData.json();
  
    data.find(function(p){
      const url = new URL(window.location.href)
      const params = new URLSearchParams(url.search)
      const urlID = params.get('id')
      if(p.id == urlID){
        displayTitle.innerHTML = `<div>${p.title}</div>`
        displayPriceOld.innerHTML = `<div>${(parseFloat(p.price) + parseFloat(p.price)*20/100).toFixed(3)}đ</div>`
        displayPrice.innerHTML = `<div>${p.price}</div>`
        displayImg.innerHTML = `<img src="${p.img}" alt="">`
      }
    })
  })()

