



# Originally an Assignment. 

Task : Test XMLHTTPRequests(XHR) against JavaScript libraries & Use the given API to fetch Google Accounts and perform basic CRUD operations.

Libraries Chosen
- Axios
- Fetch


## Axios vs Fetch vs XHR
## Syntax: 
Fetch API uses the JavaScript fetch() function, and requires more boilerplate code. While XHR requires you to manually create the request object and set up event listeners for handling the response. Axios has a simpler and more consistent syntax, making it easier to use.

## Robust Error Handling: 
Fetch handles errors at the individual request level, with Axios, you can catch errors globally or at the request level. XHR overall has a more complex error handling mehcanism. 

## Request Cancellation: 
Axios allows you to cancel a request while it is in progress, which is not possible with the Fetch API or XHR.

## Decision : Axios
Due to it being a powerful and feature-rich library that offers a simpler and more consistent syntax, robust error handling, request cancellation, and a small file size. Axios seems like the best choice, it's also compatible with most of the browser and Nodejs, which makes it a good option for web applications.

# Use

Originally used with an API that fetched data using an ID, insert the selected ID from the API you're using to fetch the data. Can be be re-written to just use a link without an ID.

```javascript
let getOptionValuesUrl = 'https://example.com/example' + idSelected + '?apiKey=12c34de5-6789-012b-3ea4-5ed678901b2f';

        axios.get(getOptionValuesUrl, { validateStatus: () => true })
            .then(response => examineResponse(response))
            .then(data => displayOptionValues(data))
    }
```

Use the GUI to execute the CRUD operations




