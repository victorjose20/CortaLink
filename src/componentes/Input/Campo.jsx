import axios from "axios"
import { useState } from "react";


const token = import.meta.env.VITE_TOKEN



function Campo() {




  const [links, setLinks] = useState("");
  const [cortado, setCortado] = useState([]);
  const [erro, setErro] = useState("")


  function copiarConteudo(url) {
    navigator.clipboard.writeText(url).then(() => {
      alert("O link foi copiado com sucesso!!!")
    })
  }


  function encurtar() {


    if (links.trim() === "") {
      setErro("Por favor, digite uma URL.");
      return; 
    }
    axios.post(
      "https://api.tinyurl.com/create",
      {
        url: links
      }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    ).then(resposta => {
      const urlEncurtada = resposta.data.data.tiny_url
      setCortado([...cortado, urlEncurtada]);
      setLinks("");
      setErro("");
    }).catch(error => {
      const msgErro = error.response.data.message || "Erro ao encurtar a url"
      setErro(msgErro)

    })

  }


  return (
    <main className="flex justify-center items-center h-screen flex-col gap-6 bg-amber-50">
      <h1 className="font-bold text-6xl">Corta links</h1>
      <label htmlFor="" className="">
        <input className="border border-amber-400  text-center rounded-md w-96 h-[35px]" type="text" value={links} onChange={(e) => setLinks(e.target.value)} placeholder="Digite o link" />
        {erro !== "" && <h2 className="text-center font-bold text-red-800">{erro}</h2>}
      </label>
      <button className='cursor-pointer bg-amber-400 rounded-md hover:bg-amber-300 h-[35px] w-[95px]' onClick={encurtar} >Encurtar</button>



      <ul>
        {cortado.map((item, index) => (
          <li key={index} className="flex  gap-5  mb-5 ">
            <span className="text-blue-600 underline border rounded-md  border-blue-600 h-[35px] w-[210px]">{item}</span>
            <button className="cursor-pointer bg-amber-400 rounded-md hover:bg-amber-300 h-[35px] w-[95px] no-underline " onClick={() => copiarConteudo(item)}>Copiar</button>


          </li>
        ))}

      </ul>


    </main>
  )
}

export default Campo;