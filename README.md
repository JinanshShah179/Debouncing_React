React Debounced Search Application

This project demonstrates a simple React application that implements a debounced search input field, fetching data from an API and displaying the results dynamically.

Features

Debounced Input: Reduces API calls by implementing a debounce mechanism, ensuring efficient and optimized network usage.

Dynamic Search: Updates search results in real-time as the user types.

Cleanup on Unmount: Prevents memory leaks by clearing timeouts during component unmount.

Installation

Prerequisites

Node.js and npm installed on your machine.

Steps

Clone the repository:

git clone <repository-url>

Navigate to the project directory:

cd DEBOUNCING

Install dependencies:

npm install

Start the development server:

npm start

Code Overview

Main Components

App Component

Manages the state for the search results.

Includes a debounce function to delay API calls.

Handles API fetching based on user input.

Key Functions

Debounce

A utility function that delays the execution of another function by a specified duration:

const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

handleChange

Handles changes in the input field, fetching data from the API:

const handleChange = (e) => {
  const { value } = e.target;
  fetch(`https://demo.dataverse.org/api/search?q=${value}`)
    .then((res) => res.json())
    .then((res) => setSearch(res.data.items));
};

Cleanup in useEffect

Ensures timeouts are cleared when the component is unmounted:

useEffect(() => {
  return () => {
    clearTimeout(debounceTimeout);
  };
}, []);

Dependencies

React: Handles the UI and state management.

How It Works

The user types in the input field.

The debouncedHandleChange function (wrapped in debounce) delays the API call by 300ms.

If the user pauses typing for 300ms, the handleChange function fetches search results from the API.

The results are stored in the search state and rendered dynamically below the input field.
