import utilsInstance from "../UTILS/Utils.js";

/**
 * @class AudioManager
 * @classdesc Classe de gestion audio pour le jeu spatial utilisant l'API Web Audio
 * @description Gère les sons d'ambiance et les effets sonores du jeu
 */
export class AudioManager {
    /**
     * @constructor
     * @description Initialise le gestionnaire audio avec les configurations par défaut
     */
    constructor() {
        this.utils = utilsInstance;
        this.isMuted = false;
        this.ambientVolume = 0.3;
        this.sfxVolume = 0.6;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGainNode = this.audioContext.createGain();
        this.masterGainNode.connect(this.audioContext.destination);
        this.ambientGainNode = this.audioContext.createGain();
        this.ambientGainNode.gain.value = this.ambientVolume;
        this.ambientGainNode.connect(this.masterGainNode);
        this.sfxGainNode = this.audioContext.createGain();
        this.sfxGainNode.gain.value = this.sfxVolume;
        this.sfxGainNode.connect(this.masterGainNode);
        this.buffers = {};
        this.ambientSource = null;

        // Précharger les sons
        this.init();
    }

    /**
     * @method init
     * @async
     * @description Initialise et précharge les sons nécessaires au jeu
     * @returns {Promise<void>}
     */
    async init() {
        try {
            await this.loadSound("ambient", this.utils.getImagePath("sounds", "background"));

            // Précharger d'autres sons au besoin
            // await this.loadSound("laser", this.utils.getAudioPath("sounds", "laser"));
            // await this.loadSound("explosion", this.utils.getAudioPath("sounds", "explosion"));
            // await this.loadSound("powerup", this.utils.getAudioPath("sounds", "powerup"));
        } catch (error) {
            console.error("Erreur lors du chargement des sons:", error);
        }
    }

    /**
     * @method loadSound
     * @async
     * @description Charge un fichier audio et le décode
     * @param {string} name - Nom identifiant le son
     * @param {string} url - Chemin d'accès au fichier audio
     * @returns {Promise<AudioBuffer>} Le buffer audio décodé
     * @throws {Error} Si le chargement ou le décodage échoue
     */
    async loadSound(name, url) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.buffers[name] = audioBuffer;
            return audioBuffer;
        } catch (error) {
            console.error(`Erreur lors du chargement du son ${name}:`, error);
            throw error;
        }
    }

    /**
     * @method playAmbient
     * @description Joue la musique d'ambiance en boucle
     * @returns {void}
     */
    playAmbient() {
        // S'assurer que le contexte audio est actif
        if (this.audioContext.state === "suspended") {
            this.audioContext.resume();
        }

        // Arrêter la lecture en cours si elle existe
        if (this.ambientSource) {
            this.ambientSource.stop();
        }

        if (this.buffers.ambient) {
            // Créer une nouvelle source audio
            this.ambientSource = this.audioContext.createBufferSource();
            this.ambientSource.buffer = this.buffers.ambient;
            this.ambientSource.loop = true;

            // Connecter la source au nœud de gain d'ambiance
            this.ambientSource.connect(this.ambientGainNode);

            // Démarrer la lecture
            this.ambientSource.start(0);
        }
    }

    /**
     * @method stopAmbient
     * @description Arrête la musique d'ambiance
     * @returns {void}
     */
    stopAmbient() {
        if (this.ambientSource) {
            this.ambientSource.stop();
            this.ambientSource = null;
        }
    }

    /**
     * @method playSfx
     * @description Joue un effet sonore une seule fois
     * @param {string} name - Nom du son à jouer
     * @returns {AudioBufferSourceNode|null} La source audio créée ou null si le son n'existe pas ou est muet
     */
    playSfx(name) {
        if (!this.isMuted && this.buffers[name]) {
            // Créer une source pour l'effet sonore
            const source = this.audioContext.createBufferSource();
            source.buffer = this.buffers[name];

            // Connecter à un nœud de gain pour contrôler le volume de ce son spécifique
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = this.sfxVolume;

            // Connecter la source au nœud de gain, puis au nœud de gain des effets
            source.connect(gainNode);
            gainNode.connect(this.sfxGainNode);

            // Jouer le son
            source.start(0);

            return source;
        }
        return null;
    }

    /**
     * @method setAmbientVolume
     * @description Définit le volume de la musique d'ambiance
     * @param {number} value - Valeur du volume entre 0 et 1
     * @returns {void}
     */
    setAmbientVolume(value) {
        this.ambientVolume = Math.max(0, Math.min(1, value));
        // Utiliser rampeLinear pour éviter les clics lors des changements de volume
        this.ambientGainNode.gain.setValueAtTime(this.ambientGainNode.gain.value, this.audioContext.currentTime);
        this.ambientGainNode.gain.linearRampToValueAtTime(this.ambientVolume, this.audioContext.currentTime + 0.1);
    }

    /**
     * @method setSfxVolume
     * @description Définit le volume des effets sonores
     * @param {number} value - Valeur du volume entre 0 et 1
     * @returns {void}
     */
    setSfxVolume(value) {
        this.sfxVolume = Math.max(0, Math.min(1, value));
        this.sfxGainNode.gain.setValueAtTime(this.sfxGainNode.gain.value, this.audioContext.currentTime);
        this.sfxGainNode.gain.linearRampToValueAtTime(this.sfxVolume, this.audioContext.currentTime + 0.1);
    }

    /**
     * @method toggleMute
     * @description Active ou désactive le son
     * @returns {boolean} L'état actuel du mode muet
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.masterGainNode.gain.value = this.isMuted ? 0 : 1;
        return this.isMuted;
    }

    /**
     * @method loadSoundsList
     * @async
     * @description Précharge une liste de sons depuis un répertoire de base
     * @param {string} basePath - Chemin de base pour les fichiers audio
     * @param {Array<{name: string, file: string}>} soundList - Liste des sons à charger
     * @returns {Promise<void>}
     */
    async loadSoundsList(basePath, soundList) {
        const loadPromises = soundList.map((sound) => this.loadSound(sound.name, `${basePath}/${sound.file}`));

        try {
            await Promise.all(loadPromises);
            console.log("Tous les sons ont été chargés avec succès");
        } catch (error) {
            console.error("Erreur lors du chargement des sons:", error);
        }
    }
}

// Initialisation du gestionnaire audio quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function () {
    // Créer le gestionnaire audio
    const audioManager = new AudioManager();

    // Ajouter un bouton de contrôle audio à l'interface
    const audioControl = document.createElement("div");
    audioControl.className = "audio-control";
    audioControl.innerHTML = "🔊";
    audioControl.style.position = "absolute";
    audioControl.style.top = "10px";
    audioControl.style.right = "10px";
    audioControl.style.fontSize = "24px";
    audioControl.style.color = "white";
    audioControl.style.cursor = "pointer";
    audioControl.style.zIndex = "1000";
    document.body.appendChild(audioControl);

    // Gestionnaire d'événement pour le bouton audio
    audioControl.addEventListener("click", function () {
        const isMuted = audioManager.toggleMute();
        this.innerHTML = isMuted ? "🔇" : "🔊";
    });

    // Démarrer l'audio quand le jeu commence
    utilsInstance.addEvListener("html", "gamestart", function () {
        // S'assurer que le contexte audio est démarré (nécessite une interaction utilisateur)
        if (audioManager.audioContext.state === "suspended") {
            audioManager.audioContext.resume().then(() => {
                audioManager.playAmbient();
            });
        }
    });
});
