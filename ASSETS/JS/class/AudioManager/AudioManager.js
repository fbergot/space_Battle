// Classe de gestion audio pour le jeu spatial
class AudioManager {
  constructor() {
    this.ambientSound = null;
    this.sfx = {};
    this.isMuted = false;
    this.ambientVolume = 0.3; // Volume par défaut pour l'ambiance (30%)
    this.sfxVolume = 0.6;     // Volume par défaut pour les effets sonores (60%)

    // Précharger les sons
    this.init();
  }

  init() {
    // Créer l'élément audio pour le son d'ambiance
    this.ambientSound = new Audio();
    this.ambientSound.src = 'sounds/space-ambient.mp3'; // Chemin vers votre fichier audio
    this.ambientSound.loop = true;
    this.ambientSound.volume = this.ambientVolume;

    // Précharger les effets sonores courants (à adapter selon vos besoins)
    this.preloadSfx('laser', 'sounds/laser.mp3');
    this.preloadSfx('explosion', 'sounds/explosion.mp3');
    this.preloadSfx('powerup', 'sounds/powerup.mp3');
  }

  preloadSfx(name, path) {
    this.sfx[name] = new Audio();
    this.sfx[name].src = path;
    this.sfx[name].volume = this.sfxVolume;
  }

  // Démarrer le son d'ambiance
  playAmbient() {
    // Résoudre le problème de l'autoplay avec une promesse
    const playPromise = this.ambientSound.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // L'autoplay a été empêché par le navigateur
        console.log("Autoplay prevented by browser. User interaction needed.");

        // Ajouter un gestionnaire d'événements pour permettre la lecture après l'interaction utilisateur
        const handleUserInteraction = () => {
          this.ambientSound.play();
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('keydown', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);
      });
    }
  }

  // Arrêter le son d'ambiance
  stopAmbient() {
    this.ambientSound.pause();
    this.ambientSound.currentTime = 0;
  }

  // Jouer un effet sonore
  playSfx(name) {
    if (this.sfx[name] && !this.isMuted) {
      // Cloner l'audio pour permettre des lectures simultanées
      const sound = this.sfx[name].cloneNode();
      sound.volume = this.sfxVolume;
      sound.play();
    }
  }

  // Régler le volume de l'ambiance
  setAmbientVolume(value) {
    this.ambientVolume = Math.max(0, Math.min(1, value));
    this.ambientSound.volume = this.ambientVolume;
  }

  // Régler le volume des effets
  setSfxVolume(value) {
    this.sfxVolume = Math.max(0, Math.min(1, value));
  }

  // Activer/désactiver tous les sons
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.ambientSound.muted = this.isMuted;
    return this.isMuted;
  }
}

// Exemple d'utilisation dans le jeu
document.addEventListener('DOMContentLoaded', function() {
  // Créer le gestionnaire audio
  const audioManager = new AudioManager();

  // Ajouter un bouton de contrôle audio à l'interface
  const audioControl = document.createElement('div');
  audioControl.className = 'audio-control';
  audioControl.innerHTML = '🔊';
  audioControl.style.position = 'absolute';
  audioControl.style.top = '10px';
  audioControl.style.right = '10px';
  audioControl.style.fontSize = '24px';
  audioControl.style.color = 'white';
  audioControl.style.cursor = 'pointer';
  audioControl.style.zIndex = '1000';
  document.body.appendChild(audioControl);

  // Gestionnaire d'événement pour le bouton audio
  audioControl.addEventListener('click', function() {
    const isMuted = audioManager.toggleMute();
    this.innerHTML = isMuted ? '🔇' : '🔊';
  });

  // Démarrer le son d'ambiance lors du début du jeu
  const startGame = function() {
    audioManager.playAmbient();

    // Exemple de déclenchement d'effets sonores
    // Ceci est juste un exemple, à adapter à votre logique de jeu
    document.addEventListener('keydown', function(e) {
      if (e.code === 'Space') {
        audioManager.playSfx('laser');
      }
    });

    // Supprimer cet écouteur après le premier démarrage
    document.removeEventListener('click', startGame);
  };

  // Démarrer le jeu et le son sur le premier clic
  document.addEventListener('click', startGame);
});

// Fonction pour charger dynamiquement les sons
function loadSounds(basePath, soundList) {
  const audioManager = new AudioManager();

  soundList.forEach(sound => {
    audioManager.preloadSfx(sound.name, `${basePath}/${sound.file}`);
  });

  return audioManager;
}

// Exemple d'utilisation de chargement dynamique
/*
const gameAudio = loadSounds('assets/audio', [
  { name: 'ambient', file: 'space-ambient.mp3' },
  { name: 'laser', file: 'laser.mp3' },
  { name: 'explosion', file: 'explosion.mp3' }
]);
*/