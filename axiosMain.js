// Global Constants
const idSelectedInput = document.getElementById('idSelected');
const googleAccountName = document.getElementById('googleAccountName');
const googleId = document.getElementById('googleId');
const platformName = document.getElementById('platformName');
const optionName = document.getElementById('optionName');
const optionValue = document.getElementById('optionValue');
const dotDigitalId = document.getElementById('dotDigitalId');
const rooftopId = document.getElementById('rooftopId');

// Create Option Value Inputs
const createPlatformNameInput = document.getElementById('createPlatformNameInput');
const createOptionNameInput = document.getElementById('createOptionNameInput');
const createOptionValueInput = document.getElementById('createOptionValueInput');
const createDotDigitalIdInput = document.getElementById('createDotDigitalIdInput');
const createGoogleIdInput = document.getElementById('createGoogleIdInput');

// Update Option Value Inputs 
const updateRooftopIdInput = document.getElementById('updateRooftopIdInput');
const updatePlatformNameInput = document.getElementById('updatePlatformNameInput');
const updateOptionValueInput = document.getElementById('updateOptionValueInput');
const updateGoogleIdInput = document.getElementById('updateGoogleIdInput');

// Delete Option Value Inputs
const deleteRooftopIdInput = document.getElementById('deleteRooftopIdInput');
const deleteGoogleIdInput = document.getElementById('deleteGoogleIdInput');

// Clears All Option Values
function clearOptionValues() {
    googleAccountName.innerHTML = '';
    googleId.innerHTML = '';
    platformName.innerHTML = '';
    optionName.innerHTML = '';
    optionValue.innerHTML = '';
    dotDigitalId.innerHTML = '';
    rooftopId.innerHTML = '';

    idSelectedInput.value = '';

    createPlatformNameInput.value = '';
    createOptionNameInput.value = '';
    createOptionValueInput.value = '';
    createDotDigitalIdInput.value = '';
    createGoogleIdInput.value = '';

    updateRooftopIdInput.value = '';
    updatePlatformNameInput.value = '';
    updateOptionValueInput.value = '';
    updateGoogleIdInput.value = '';

    deleteRooftopIdInput.value = '';
    deleteGoogleIdInput.value = '';
}

// Displays Requested Option Values
function displayOptionValues(obj) {
    const data = obj['data'];

    if (data.length == 0) {
        alert('No Data to Display');
    }

    else {

        clearOptionValues();

        const googleNameElement = document.createElement('p');
        googleNameElement.textContent = data[0]['googleAccount'].viewName;
        googleAccountName.appendChild(googleNameElement);

        const googleIdElement = document.createElement('p');
        googleIdElement.textContent = 'Google ID:' + ' ' + data[0].googleId;
        googleId.appendChild(googleIdElement);

        for (let i = 0; i < data.length; i++) {

            const platformNameElement = document.createElement('p');
            platformNameElement.textContent = data[i].platformName;
            platformName.appendChild(platformNameElement);

            const optionNameElement = document.createElement('p');
            optionNameElement.textContent = data[i].optionName;
            optionName.appendChild(optionNameElement);

            const optionValueElement = document.createElement('p');
            optionValueElement.textContent = data[i].optionValue;
            optionValue.appendChild(optionValueElement);

            const dotDigitalIdElement = document.createElement('p');
            dotDigitalIdElement.textContent = data[i].dotDigitalId;
            dotDigitalId.appendChild(dotDigitalIdElement);

            const rooftopIdElement = document.createElement('p');
            rooftopIdElement.textContent = data[i].rooftopGoogleOptionId;
            rooftopId.appendChild(rooftopIdElement);

        }

    }
}

function getInitialOptionValues() {

    let idSelected = '';
    idSelected = idSelectedInput.value;

    if (!idSelected) {
        alert('Please Select an ID');
    }

    else {

    let getOptionValuesUrl = 'https://services.metricsamsi.com/v1.0/dealers/Options/' + idSelected + '?apiKey=81c14de2-6891-461b-9ea6-3ed218675b8f';

        axios.get(getOptionValuesUrl, { validateStatus: () => true })
            .then(response => examineResponse(response))
            .then(data => displayOptionValues(data))
    }

    function examineResponse(response) {
        if (response.status == 200) {
            console.log('Initial Values Values Received');
            idSelectedInput.value = '';
            return response.data;
        }
        else if (response.status == 403) {
            console.log('Initial Values Forbidden')
            alert('Google ID is Locked');
        }
        else if (response.status == 500) {
            console.log('Initial Values Server Error')
            alert('500 Server Error');
        }
    }
    }

function getNewValues(googleId){
    let getOptionValuesUrl = 'https://services.metricsamsi.com/v1.0/dealers/Options/' + googleId + '?apiKey=81c14de2-6891-461b-9ea6-3ed218675b8f';

    axios.get(getOptionValuesUrl, { validateStatus: () => true })
    .then(response => examineResponse(response))
    .then(data => displayOptionValues(data))

    function examineResponse(response) {
        if (response.status == 200) {
            console.log('New Values Received');
            return response.data;
        }
        else if (response.status == 403) {
            console.log('New Values Forbidden')
            alert('Google ID is Locked');
        }
        else if (response.status == 500) {
            console.log('New Value Server Error')
            alert('500 Server Error');
        }
    }
}

function createOptionValues(){
    let createPlatformNameInputValue = '';
    createPlatformNameInputValue = createPlatformNameInput.value;

    let createOptionNameInputValue = '';
    createOptionNameInputValue = createOptionNameInput.value;

    let createOptionValueInputValue = '';
    createOptionValueInputValue = createOptionValueInput.value;

    let createDotDigitalIdInputValue = '';
    createDotDigitalIdInputValue = createDotDigitalIdInput.value;

    let createGoogleIdInputValue = '';
    createGoogleIdInputValue = createGoogleIdInput.value;

    if (!createOptionNameInput.value || !createPlatformNameInput.value || !createGoogleIdInput.value || !createDotDigitalIdInput.value) {
        alert('Invalid Entry');
    }

    else {
        const createOptionValuesUrl = 'https://services.metricsamsi.com/v1.0/dealers/Options?apiKey=81c14de2-6891-461b-9ea6-3ed218675b8f';

        axios.post(createOptionValuesUrl, {
            optionName: createOptionNameInputValue,
            optionValue: createOptionValueInputValue,
            platformName: createPlatformNameInputValue,
            googleId: createGoogleIdInputValue,
            dotDigitalId: createDotDigitalIdInputValue,
        }, {validateStatus: () => true})
        .then(response => examineResponse(response))
    }

    function examineResponse(response) {
        if (response.status == 201) {
            getNewValues(createGoogleIdInputValue);
            console.log('Option Values Created');
            createPlatformNameInput.value = '';
            createOptionNameInput.value = '';
            createOptionValueInput.value = '';
            createDotDigitalIdInput.value = '';
            createGoogleIdInput.value = '';
            return response.data;
        }
        else if (response.status == 400) {
            console.log('Bad Create Option Values Request');
            alert('Google ID is Locked');
        }
        else if (response.status == 403) {
            console.log('Create Option Value Forbidden')
            alert('Google ID is Locked');
        }
        else if (response.status == 422) {
            if (createOptionNameInput.value && createPlatformNameInput.value && createGoogleIdInput.value && createDotDigitalIdInput.value) {
                // Dev Note: Unable to Process Instructions : 422 will be thrown when Plaform or Option Name already exists, but not always. 
                console.log('Create Option Value Client Error')
                alert('Duplicate Names Detected');
            }
        }
        else if (response.status == 500) {
            console.log('Create Option Values Server Error')
            alert('500 Server Error');
        }
    }
}

function updateOptionValues(){
    let updateRooftopIdInputValue = '';
    updateRooftopIdInputValue = updateRooftopIdInput.value;

    let updatePlatformNameInputValue = '';
    updatePlatformNameInputValue = updatePlatformNameInput.value;

    let updateOptionValueInputValue = '';
    updateOptionValueInputValue = updateOptionValueInput.value;

    let updateGoogleIdInputValue = '';
    updateGoogleIdInputValue = updateGoogleIdInput.value;

    if (!updateRooftopIdInput.value || !updateGoogleIdInput.value) {
        alert('Rooftop & Google ID are Required');
    }

    else {
        let updateOptionValuesUrl = 'https://services.metricsamsi.com/v1.0/dealers/Options/' + updateRooftopIdInputValue + '?apiKey=81c14de2-6891-461b-9ea6-3ed218675b8f';

        axios.patch(updateOptionValuesUrl, {
            optionValue: updateOptionValueInputValue,
            platformName: updatePlatformNameInputValue,
            googleId: updateGoogleIdInputValue
        }, { validateStatus: () => true })
        .then(response => checkIds(response))
        .then(response => examineResponse(response))
    }

    function checkIds(response){
        let _data = response.data;
        if (_data.data.googleId == updateGoogleIdInputValue){
            return response
        }
        else {
            alert('Rooftop ID does not Exist in this Google ID');
            console.log(response);
        }
    }

    function examineResponse(response) {

        if (response.status == 200) {
            console.log('Values Updated');
            getNewValues(updateGoogleIdInputValue);
            updateRooftopIdInput.value = '';
            updatePlatformNameInput.value = '';
            updateOptionValueInput.value = '';
            updateGoogleIdInput.value = '';
            return response.data;
        }
        else if (response.status == 400) {
            console.log('Bad Update Option Values Request');
            alert('Invalid Entry');
        }
        else if (response.status == 403) {
            console.log('Forbidden Update Values Request');
            alert('Google ID is Locked');
        }
        else if (response.status == 422) {
            console.log('Update Option Values Client Error');
            alert('Invalid Entry');
        }
        else if (response.status == 500) {
            alert('500 Server Error');
            console.log('Update Option Values Server Error');
        }
    }
}

function deleteOptionValues(){
    let deleteSelectedId = '';
    deleteSelectedId = deleteRooftopIdInput.value;

    let deleteGoogleId = '';
    deleteGoogleId = deleteGoogleIdInput.value;

    if (!deleteRooftopIdInput.value || !deleteGoogleIdInput.value) {
        alert('Rooftop & Google ID are Required');
    }

    else {

        let deleteOptionValuesUrl = 'https://services.metricsamsi.com/v1.0/dealers/Options/' + deleteSelectedId + '?apiKey=81c14de2-6891-461b-9ea6-3ed218675b8f';

        axios.delete(deleteOptionValuesUrl, {
            rooftopId: deleteSelectedId,
            googleId: deleteGoogleId
        }, { validateStatus: () => true})
        .then(response => examineResponse(response))
        
    }
    function examineResponse(response) {
        if (response.status == 204) {
            getNewValues(deleteGoogleId);
            console.log('Option Values Deleted');
            deleteRooftopIdInput.value = '';
            deleteGoogleIdInput.value = '';
        }
        else if (response.status == 403) {
            console.log('Delete Request Forbidden');
            alert('Google ID Locked')
        }
        else if (response.status == 500) {
            console.log('Delete Server Error');
        }
    }
}



