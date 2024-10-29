import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { currencyConverter } from "./api/postApi";

const App = () =>{
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

 const { data:convertedAmount , isLoading, error,refetch} = useQuery({
    queryKey : ['currency'],
    queryFn :() => currencyConverter(fromCurrency, toCurrency, amount),
    enabled : false,
  })
  const handleConvertCurrency = () =>{
    if( amount > 0){
      refetch();
    }
  }
  return(
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <hr />
        <div>
          <label htmlFor="currency_amount">
            Amount:
            <input
              type="number"
              id="currency_amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <div className="currency-selector">
          <div>
            <label>
              From:
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {["USD","EUR","INR","GBP","AUD"].map(( currency ) => {
                  return (
                    <option key= {currency } value={currency }>{currency }</option>
                  )
                })}                
              </select>
            </label>
          </div>
          <div>
          <label>
              To:
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} >
                {["INR","EUR","USD","GBP","AUD"].map(( currency ) => {
                  return (
                    <option key= {currency } value={currency }>{currency }</option>
                  )
                })}                
              </select>
            </label>
          </div>
        </div>
        <button
          disabled={isLoading || amount <= 0}
          onClick={handleConvertCurrency}
        >
          {isLoading ? "converting.." : "convert"}
        </button>
        <hr />
        {convertedAmount && (
          <div>
            <h2>
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)}
              {toCurrency}
            </h2>
          </div>
        )}
        {error && <p>An error occurred :  { error.message } </p>} 
      </div>
    </section>
  )
}
export default App