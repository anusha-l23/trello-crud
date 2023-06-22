import httpClient from "./httpClient";

export const getAllCards = () => {
  return httpClient({
    method: "GET",
    url: "/cards",
  });
};

export const addCard = (data:any) => {
  return httpClient({
    method: "POST",
    url: "/cards/add",
    data
  });
};

export const updateCard = (data:any, id:any) => {
  return httpClient({
    method: "PUT",
    url: `/cards/${id}`,
    data
  });
};

export const deleteCard = (id:any) => {
  return httpClient({
    method: "DELETE",
    url: `/cards/${id}`
  });
};
