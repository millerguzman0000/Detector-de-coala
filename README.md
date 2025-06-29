# Detector-de-coala
Una sofisticada app para detención de vida coala

import React, { useState, useRef } from "react";

export default function DetectorDeCoalas() {
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [certificado, setCertificado] = useState(null);
  const canvasRef = useRef(null);

  const tomarFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
        const noEresCoala = Math.random() > 0.2;
        const resultadoTexto = noEresCoala
          ? `✅ Felicidades ${nombre}, no eres un coala.`
          : `🦝 Uy ${nombre}, sospechamos que podrías ser un coala.`;
        setResultado(resultadoTexto);
        if (noEresCoala) {
          setCertificado(true);
          setTimeout(() => dibujarCertificado(nombre), 100); // dibuja certificado luego de mostrar resultado
        } else {
          setCertificado(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Dibuja certificado en canvas invisible
  const dibujarCertificado = (nombreCert) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = 800;
    const height = 600;
    canvas.width = width;
    canvas.height = height;

    // Fondo
    ctx.fillStyle = "#f0e9ff";
    ctx.fillRect(0, 0, width, height);

    // Texto
    ctx.fillStyle = "black";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🐨 CERTIFICADO ANTI-COALA 🐨", width / 2, 80);

    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Se certifica que:", 80, 150);

    ctx.font = "36px Arial";
    ctx.fillStyle = "darkblue";
    ctx.fillText(nombreCert, width / 2, 220);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(
      "Ha sido oficialmente analizado por el Detector de Coalas®",
      80,
      280
    );
    ctx.fillText(
      "Y se ha determinado con un 100% de certeza que NO es un coala.",
      80,
      320
    );
    ctx.fillText(
      "📸 Verificación facial completada sin presencia de pelaje, orejas suaves,",
      80,
      380
    );
    ctx.fillText("ni comportamiento de trepar árboles.", 80, 410);

    ctx.fillStyle = "gray";
    ctx.fillText(
      "Emitido por: Laboratorio Internacional de Detección de Marsupiales (LIDeM)",
      80,
      480
    );
    ctx.fillText("Fecha: 29 de junio de 2025", 80, 520);
  };

  // Descarga la imagen del certificado
  const descargarCertificado = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Certificado_No_Coala_${nombre}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const compartir = () => {
    const texto = `Resultado del Detector de Coalas:\n${resultado}`;
    navigator.share
      ? navigator.share({ title: "Detector de Coalas", text: texto })
      : alert("Tu navegador no permite compartir directamente.");
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
              <button onClick={descargarCertificado}>Descargar Certificado</button>
            </>
          )}
          <button onClick={compartir}>Compartir resultado</button>
        </div>
      )}

      {/* Canvas invisible para certificado */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}
