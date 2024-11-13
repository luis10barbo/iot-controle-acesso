import { useEffect, useState} from 'react'
import {type Acessos} from "../../backend/src/model/acesso"
import {type Cartoes} from "../../backend/src/model/cartao"
import './App.css'

function App() {
  const [acessos, setAcessos] = useState<Acessos>([]);
  const [cartoes, setCartoes] = useState<Cartoes>([]);

  async function adquirirAcessos() {
    setAcessos(await (await fetch("https://iot.luisbrb.com.br/acesso/listar", {headers: {"Content-Type": "application/json"}})).json());
  }

  async function adquirirCartoes() {
    setCartoes(await (await fetch("https://iot.luisbrb.com.br/cartao/listar", {headers: {"Content-Type": "application/json"}})).json())
  }

  async function mudarPermissao(id: string, autorizacao: boolean) {
    await fetch("https://iot.luisbrb.com.br/cartao/autorizacao", {method:"POST", headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: new URLSearchParams({"id_cartao": id, "autorizacao": JSON.stringify(autorizacao)})})
    await adquirirCartoes();
  }


  useEffect(() => {
    adquirirAcessos();
    adquirirCartoes();
    const es = new EventSource("http://localhost:8000/acesso/observar");
    es.onopen = () => {console.log("Connection open!")}
    es.onerror = (e) => {console.log(e)}
    es.onmessage = (message) => {
      setAcessos((acessosAntigo) => {
        return [...acessosAntigo, message.data]
      }) 
    }
  }, []) 

  return (
    <>
      <div className="container">
        <div className="access-list">
            <h3>Lista de Acessos</h3>
            <div className="accesses">
            {acessos.map((acesso) => {
              const date = new Date(acesso.dataInteracao as any as string);
              return <div key={acesso.idAcesso} className="access-item">
              <div>
                  <p>{acesso.idCartao}</p>
                  <p className="timestamp">{date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
              </div>
              {acesso.liberado ? 
              <p className="access-status liberado">Acesso Liberado</p>
              :
              <p className="access-status negado">Acesso Negado</p>
              }
              
          </div>
            })}
            </div>
            
        </div>
        
        <div className="main-panel">
            <h1>Porta A</h1>
            <p className="card-id">3129cdaf901930r3fds90fa8093890</p>
            
            <div className="authorized-cards">
                <h3>Cartoes</h3>
                <div id="authorized-list">
                  {cartoes.map((cartao) => {
                    
                    return <div key={cartao.id} className="authorized-card">
                    <p>{cartao.id}</p>
                    {cartao.PortasPermitidas.length > 0 ? <>autorizado</> : <>nao autorizado</> }
                    <button onClick={() =>  void mudarPermissao(cartao.id, !(cartao.PortasPermitidas.length > 0))}>Mudar Permissao</button>
                </div>
                  })}
                    
                  
                </div>
                <div className="authorized-card">
                    <button className="action" onClick={() => addCard()}>Adicionar</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default App
