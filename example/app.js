const tabs = document.querySelectorAll(".tabheader__item");
const tabsParent = document.querySelector(".tabheader__items");
const tabContent = document.querySelectorAll(".tabcontent");

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = "none";
    });
    tabs.forEach((item) => {
        item.classList.remove("tabheader__item_active");
    });
};

const showTabContent = (i = 0) => {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
};
hideTabContent();
showTabContent();


let slideIndex = 0;

tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("tabheader__item")) {
        tabs.forEach((item, i) => {
            if (target === item) {
                slideIndex = i;
                hideTabContent();
                showTabContent(slideIndex);
            }
        });
    }
});

const timer = () => {
    slideIndex++;

    if (slideIndex > 3) {
        slideIndex = 0;
    }
    hideTabContent()
    showTabContent(slideIndex)
}
setInterval(timer, 2000)

const modal = document.querySelector(".modal");
const modalTrigger = document.querySelectorAll("[data-modal]");

modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
});
const modalTimeout =setTimeout(openModal,50000)
function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";

    clearInterval(modalTimeout);
}


function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

modal.addEventListener("click", (event) => {
    if (
        event.target === modal ||
        event.target.classList.contains("modal__close")
    ) {
        closeModal();
    }
});
const body = document.getElementsByTagName('html')
const modal1 = document.querySelector('.modal')
const modalClose = document.querySelector('.modal__close')
window.addEventListener('scroll', () => {
    if (document.body.clientHeight - body[0].clientHeight === body[0].scrollTop) {
        modal1.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modalClose.addEventListener('click', () => {
            modal1.style.display = 'none';
            document.body.style.overflow = 'visible';
        });
    }
})


function openModalScroll() {
    const page = document.documentElement;

    if (page.scrollTop + page.clientHeight >= page.scrollHeight) {
        openModal();

        window.removeEventListener("scroll", openModalScroll);
    }
}

window.addEventListener("scroll", openModalScroll);


const forms = document.querySelectorAll('form')





const postData = (form)=>{
    form.addEventListener('submit',(event)=>{
        event.preventDefault()

        const req = new XMLHttpRequest()
        req.open("POST","server.php")
        req.setRequestHeader("Content-type","application/json")

        const formData = new FormData(form)
        const obj ={}

        formData.forEach((item,name)=>{
            obj[name]=item
        })

        console.log(obj)
        const json = JSON.stringify(obj)
        req.send(json)
        req.addEventListener('load',()=>{
            if(req.status ===200){
                alert('success')
            }else if(req.status>=400){
                alert('fail')
            }
        })
    })
}
forms.forEach((item)=>{
    postData(item)
})