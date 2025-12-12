function Obrigado() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'  
    }}>
      <h1>🎉 Obrigado por completar o quiz!</h1>
      <p>Seu resultado foi enviado com sucesso.</p>
      <p>Em breve você receberá mais informações.</p>
    </div>
  );
}

export default Obrigado;
