//hide preloader
//all the images,script,links have finished loading

//window event list

eventlistener();
function eventlistener(){
    const ui=new UI()

    //preloader
    window.addEventListener('load',function(){
       ui.hidePreloader();
    })
    //nav button
    document.querySelector('.navBtn').addEventListener('click',function(){
        ui.showNav();
    }) 
    //controlling video
    document.querySelector('.video__switch').addEventListener('click',function(){
        ui.videoControls();    
    }) 
    //submit the form
    document.querySelector('.drink-form').addEventListener('submit',function(event){
        event.preventDefault();
        const name=document.querySelector('.input-name').value;
        const lastname=document.querySelector('.input-lastname').value;
        const email=document.querySelector('.input-email').value;
        let value = ui.checkEmpty(name,lastname,email)
        if(value){

            let customer=new Customer(name,lastname,email)
            console.log(customer);
            ui.addCustomer(customer)
            ui.showfeedback('Customer Added To The List','success')
            ui.clearFields()
        }
        else{
            ui.showfeedback('Some Form Values Empty', 'error')
        }
    })
    //displaying model by zooming in and out
    const links=document.querySelectorAll('.work-item__icon');

    links.forEach(function(item){
        item.addEventListener('click',function(event){
            ui.showModal(event)
        })
    })
    //hide modal
    document.querySelector('.work-modal__close').addEventListener('click',function(){
        ui.closeModal()
    })
}




//constructor function
function UI(){
} 

//hide preloader    
//UI.prototype.hidePreloader=function(){
  //  document.querySelector('.preloader').style.display="none";
//}

//show Nav
UI.prototype.showNav=function(){
    document.querySelector('.nav').classList.toggle('nav--show')
}

//play/pause the video
UI.prototype.videoControls=function(){
    let btn=document.querySelector('.video__switch-btn');
    if(!btn.classList.contains('btnSlide')){
        btn.classList.add('btnSlide')
        document.querySelector('.video__item').pause()
    }
    else{
        btn.classList.remove('btnSlide')
        document.querySelector('.video__item').play()

    }
}

//check for empty values
UI.prototype.checkEmpty = function(name,lastname,email){
    let result;
    if(name==='' || lastname==='' || email===''){
        result=false;
    }
    else{
        result=true;
    }
    return result;
}
UI.prototype.showfeedback=function(text,type){
    const feedback= document.querySelector('.drink-form__feedback');
    if(type==='success'){
        feedback.classList.add('success');
        feedback.innerText=text;
        this.removeAlert('success'); 
    }
    else if(type==='error'){
        feedback.classList.add('error');
        feedback.innerText=text;
        this.removeAlert('error');
    }
}

//remove alert
UI.prototype.removeAlert=function(type){
    setTimeout(function(){
        document.querySelector('.drink-form__feedback').classList.remove(type);
    },3000)
}

//adding customer
UI.prototype.addCustomer=function(customer){
    const images=[1,2,3,4,5,6,7,8];
    let random=Math.floor(Math.random()*images.length);
    const div =document.createElement('div');
    div.classList.add('person');
    div.innerHTML=`<img src="img/person ${random}.jpg" alt="person" class="person__thumbnail">
    <h4 class="person__name">${customer.name}</h4>
    <h4 class="person__lastname">${customer.lastname}</h4>`
    document.querySelector('.drink-card__list').appendChild(div)
}

//clear fields after one input
UI.prototype.clearFields=function(){
    document.querySelector('.input-name').value='';
    document.querySelector('.input-lastname').value='';
    document.querySelector('.input-email').value='';
}

//show modal
UI.prototype.showModal=function(event){
    event.preventDefault();
    if(event.target.parentElement.classList.contains('work-item__icon'));
    let id=event.target.parentElement.dataset.id

    const modal=document.querySelector('.work-modal');
    const modalItem= document.querySelector('.work-modal__item');

    modal.classList.add('work-modal--show');
    modalItem.style.backgroundImage= `url(img/work${id}.jpg)`
}
//hide modal
UI.prototype.closeModal=function(){
    document.querySelector('.work-modal').classList.remove('work-modal--show')
}


function Customer(name,lastname,email){
    this.name=name;
    this.lastname=lastname;
    this.email=email;
}
