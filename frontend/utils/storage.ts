let storage = localStorage.getItem('token') ? localStorage : sessionStorage;

export const getStorage = () => storage;
export const setStorage = (store: Storage) => {
	storage = store;
};
