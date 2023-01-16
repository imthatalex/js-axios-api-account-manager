# API Account Manager

This program was originally intended to fetch accounts from a specific API using an ID and perform basic CRUD operations such as create, read, update and delete these accounts. The original API is no longer available, but the code can still be used with any API that uses an ID for retrieving data.


### Prerequisites
- Understanding of API calls and authentication methods
- Access to an API endpoint that uses an ID to retrieve data

### Using the Program
1. Clone or Download the Repo.
2. Update the getOptionValuesUrl variable in the code with the endpoint of the API you are using.
```javascript
    let getOptionValuesUrl = 'https://services.metricsamsi.com/v1.0/dealers/Options/' + idSelected + '?apiKey=81c14de2-6891-461b-9ea6-3ed218675b8f';

        axios.get(getOptionValuesUrl, { validateStatus: () => true })
            .then(response => examineResponse(response))
            .then(data => displayOptionValues(data))
    }
```
3. Update the headers variable with the necessary authentication information for the API.
```javascript
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
```
4. Open http://localhost:3000 in your browser to use the GUI & interact with the API.



### Features
- Uses JavaScript and the axios library for making API calls
- Uses an ID to retrieve data from the API
- Includes functions for performing basic CRUD operations
- Can be easily adapted to work with any API that uses an ID for retrieving data

### Built With
- JavaScript
- Axios - JavaScript library for making HTTP requests

### Acknowledgments
[Axios documentation](https://axios-http.com/docs/intro) for guidance on making HTTP requests,
please note, the code provided in this file is just an example and it may not work if you run it, as it needs to be adapted to the specific API endpoint you want to use with it.
