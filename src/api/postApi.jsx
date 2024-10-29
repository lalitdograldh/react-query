import axios from "axios"

const api = axios.create({
    baseURL :"https://v6.exchangerate-api.com/v6/65917ebd7fb99059dae5ed09"
});

export const currencyConverter = async (fromCurrency,toCurrency,amount) => {
    const res = await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
    console.log(res);
    return res.data.conversion_result;
}