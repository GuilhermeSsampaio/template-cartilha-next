import React, { useEffect, useState } from 'react';

// Componente que renderiza o botão de instalação para Android e desktop (PWA)

function InstallButton() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Verifica se o botão de instalação deve ser exibido com base no valor armazenado no localStorage
    const isInstallButtonVisible = localStorage.getItem('showInstallButton') === 'true';
    setShowInstallButton(isInstallButtonVisible);

    // Event listener para capturar o evento 'beforeinstallprompt'
    window.addEventListener('beforeinstallprompt', (e) => {
      // Cancela o evento padrão para evitar que o navegador exiba o prompt de instalação
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
      localStorage.setItem('showInstallButton', 'true');
    });

    // Remove o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener('beforeinstallprompt', (e) => {
        setDeferredPrompt(null);
      });
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Exibe o prompt de instalação
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação');
        } else {
          console.log('Usuário recusou a instalação');
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
        localStorage.removeItem('showInstallButton');
      });
    }
  };

  return (
    <>
      {showInstallButton && (
        <div>
          <button id='btn-instalar' className='btn' onClick={handleInstallClick}>
            Instalar
          </button>
        </div>
      )}
    </>
  );
}

export default InstallButton;
