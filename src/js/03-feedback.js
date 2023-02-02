import throttle from 'lodash.throttle';


const feedbackForm = document.querySelector('.feedback-form');
const FEEDBACK_FORM_STATE = 'feedback-form-state';
let localObject = { email: ' ', message: ' ' };


feedbackForm.addEventListener('input', throttle(localObjectRecord, 500));

////////////////////////////////////
function localObjectRecord(event) {
    event.preventDefault();

    localObject[event.target.name] = event.target.value

    console.log(JSON.stringify(localObject))

    localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(localObject));
};
 /////////////////////////////////////////////
const dataLocalObject = localStorage.getItem(FEEDBACK_FORM_STATE);

////////////////////////////////////
function storageStatus(dataLocalObject) { 

    if (!dataLocalObject) return
    
    try {
       let localObject = JSON.parse(dataLocalObject);
    Object.entries(localObject).forEach(([name, value]) => {
        feedbackForm[name].value = value;
     }) 
    } catch (error) { }
    
        
};
/////////////////////////////////////////
storageStatus(dataLocalObject);

feedbackForm.addEventListener('submit', submitButton);
////////////////////////////////////////////
function submitButton(event) { 
    event.preventDefault();

    localObject = { email: ' ', message: ' ' };
    event.target.reset();

    localStorage.removeItem(feedbackFormState);
}
/////////////////////////////////////////////





 
