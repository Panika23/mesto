import {titleProfilePopup, descripProfilePopup, cardName, cardUrl} from './index.js'; 

const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
      authorization: '9217bbd1-6420-46cf-9ab3-aef34a4376eb',
      'Content-Type': 'application/json'
    }
  };
  
  async function handleResponse(response) {
      if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return await response.json();
  }
  
  async function fetchData(endpoint, method) {
      try {
          const response = await fetch(`${config.baseUrl}/${endpoint}`, {
              headers: config.headers,
              method: method
          });
  
          return await handleResponse(response);
      } catch (error) {
          console.error('Ошибка:', error);
      } 
  }
  
  export const getCards = () => {
      return fetchData('cards', 'GET');
  }
  
  export const getUser = () => {
      return fetchData('users/me', 'GET');
  }
  
  export const updateUser = () => {
      return fetch(`${config.baseUrl}/users/me`, {
          headers: config.headers, 
          method: 'PATCH',
          body: JSON.stringify({
              name: titleProfilePopup.value,
              about: descripProfilePopup.value
          })
      }).then(handleResponse);
  }
  
  export const addCards = () => {
      return fetch(`${config.baseUrl}/cards`, {
          headers: config.headers,
          method: 'POST',
          body: JSON.stringify({
              name: cardName.value,
              link: cardUrl.value,
          })
      }).then(handleResponse);
  }
  
  export const deleteCards = (cardId) => {
      return fetch(`${config.baseUrl}/cards/${cardId}`, {
          headers: config.headers,
          method: 'DELETE'
      }).then(handleResponse);
  }
  
  export const handleCardLike = (cardId, method) => {
      return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
          headers: config.headers,
          method: method
      }).then(handleResponse);
  }
  
  export const addLikes = (cardId) => {
      return handleCardLike(cardId, 'PUT');
  }
  
  export const removeLikes = (cardId) => {
      return handleCardLike(cardId, 'DELETE');
  }
  
  export const updateUserAvatar = (avatar) => {
      return fetch(`${config.baseUrl}/users/me/avatar`, {
          headers: config.headers,
          method: 'PATCH',
          body: JSON.stringify({
              avatar: avatar
          })
      }).then(handleResponse);
  }