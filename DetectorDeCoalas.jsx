import React, { useState } from "react";

export default function DetectorDeCoalas() {
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [certificado, setCertificado] = useState(false);

  const tomarFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
        const noEresCoala = Math.random() > 0.2;
        const resultadoTexto = noEresCoala
          ? `✅ ¡${nombre}, no eres un coala! Felicidades 🥳`
          : `🦝 Uy ${nombre}, sospechamos que podrías ser un coala encubierto...`;
        setResultado(resultadoTexto);
        setCertificado(noEresCoala);
      };
      reader.readAsDataURL(file);
    }
  };

  const compartir = () => {
    const texto = `Resultado del Detector de Coalas:\n${resultado}`;
    navigator.share
      ? navigator.share({ title: "Detector de Coalas", text: texto })
      : alert("Tu navegador no permite compartir directamente.");
  };

  const descargarCertificado = () => {
    const link = document.createElement("a");
    link.download = `Certificado_No_Coala_${nombre}.png`;
    link.href = "/certificado.png";
    link.click();
  };

  return (
    <div className="app">
      <h1>🕵️‍♂️ Detector de Coalas</h1>
      <input
        type="text"
        placeholder="Tu nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={tomarFoto} />

      {foto && <img src={foto} alt="Tu foto" className="foto" />}

      {resultado && (
        <div className="resultado">
          <p>{resultado}</p>
          {certificado && (
            <>
              <p className="mini-info">🎓 Puedes descargar tu certificado oficial</p>
              <button onClick={descargarCertificado}>Descargar Certificado</button>
            </>
          )}
          <button onClick={compartir}>Compartir resultado</button>
        </div>
      )}
    </div>
  );
}