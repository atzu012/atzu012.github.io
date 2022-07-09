const menuSide = document.querySelector('.menu-side');
const pageSide = document.querySelector('.page-side');

const menuList = document.querySelector('.project-list');

const articleTit = document.querySelector('.page-side > h2');
const articleTag = document.querySelector('.page-side .tag-group');
const articleMain = document.querySelector('.page-side > article');
const articleBtn = document.querySelectorAll('.page-side .btn-1');

const menuCategory = document.querySelector('.menu-side nav ol');
const category = [
    {
        tit: 'a',
        text: 'Website'
    },
    {
        tit: 'b',
        text: 'Landing Page'
    },
    {
        tit: 'c',
        text: 'Side Project'
    }
]

let projects = [];
let bodyTop = 0;

function setArticle(num) {
    const obj =  projects[num];

    articleTit.innerText = obj.title;
    
    articleTag.innerHTML = '';
    for(let i=0; i < obj.tag.length; i++){
        articleTag.innerHTML += `<li>${obj.tag[i]}</li>`;
    }

    articleMain.setAttribute('w3-include-html', 'include/'+obj.article);
    articleMain.innerHTML = `<div class="center-box mt-2 mb-2">
        <div class="loader-1 center"><span></span></div>
        <span class="color-3 mt-1">Loading...</span>
    </div>`;

    w3.includeHTML();

    bodyTop = window.pageYOffset;

    console.log(bodyTop);

    window.scrollTo(0, 0);
}

function closeArticle(){
    menuSide.classList.remove('no-active');
    pageSide.classList.add('no-active');
    articleMain.innerHTML = '';

    window.scrollTo(0,bodyTop);
}

function init() {

    menuCategory.innerHTML = '<li><button type="button" data-filter="all">All</button></li>'
    for(let i=0; i < category.length; i++){
        menuCategory.innerHTML += `<li><button type="button" data-filter=".category-${category[i].tit}">${category[i].text}</button></li>`
    }

    const btn = document.querySelectorAll('nav button');
    for(let i = 0; i < btn.length; i++){
        btn[i].addEventListener('click', function(){
            for(let j=0; j<btn.length;j++){
                btn[j].classList.remove('active');
            }
            this.classList.add('active');
        });
    }

    for(let i=0; i < articleBtn.length; i++){
        articleBtn[i].addEventListener('click', closeArticle);
    }


    fetch('include/project.json',).then(response => response.json()).then(function(data) {
        //console.log(data);

        projects = data;
        menuList.innerHTML = '';

        for(let i=0; i < projects.length; i++) {
            const cTxt = category.filter(obj => obj.tit === projects[i].category );
            menuList.innerHTML+=`<a class="mix category-${projects[i].category}" data-order="${i+1}" href="javascript:;">
                <div class="img">
                    <img src="img/${projects[i].banner}" alt="${projects[i].title}">
                    <p class="text">${projects[i].title}</p>
                </div>
                <span class="tag">${cTxt[0].text}</span>
            </a>`;
        }


        const menuBtn = document.querySelectorAll('.project-list a');
        for(let i=0; i < menuBtn.length; i++){
            menuBtn[i].addEventListener('click', function(e){
                const num = this.getAttribute('data-order') - 1;
                setArticle(num);

                menuSide.classList.add('no-active');
                pageSide.classList.remove('no-active');
            })
        }

        var mixer = mixitup('.container', {
            "animation": {
                "duration": 250,
                "nudge": true,
                "reverseOut": false,
                "effects": "fade translateZ(-100px)"
            }
        });
        

    }).catch(function(err) {
        
        console.log(err);

    });
}

init();