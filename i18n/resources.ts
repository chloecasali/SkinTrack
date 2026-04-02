export const SUPPORTED_LANGUAGES = ["en", "fr"] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function normalizeLanguageTag(
  languageTag: string | null | undefined,
): AppLanguage {
  if (!languageTag) return "en";

  return languageTag.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function isSupportedLanguage(
  value: string | null | undefined,
): value is AppLanguage {
  return value === "en" || value === "fr";
}

export const resources = {
  en: {
    translation: {
      common: {
        comingSoon: "Coming soon",
        preview: "Preview",
        languages: {
          en: "English",
          fr: "French",
        },
      },
      auth: {
        heroPrivate: "Private ritual",
        heroTrackTitle: "Track",
        heroTrackBody: "Keep every skincare step in one calm space.",
        heroScanTitle: "Scan",
        heroScanBody: "Save products and routine details faster.",
        fields: {
          firstnameLabel: "First name",
          firstnamePlaceholder: "John",
          emailLabel: "Email",
          emailPlaceholder: "example@mail.com",
          passwordLabel: "Password",
          passwordPlaceholder: "••••••••",
        },
        login: {
          title: "Your skincare, curated.",
          subtitle:
            "Track every ritual, scan products, and keep your routine elegant.",
          findingAccount: "Finding account...",
          googleButtonA11yLabel: "Continue with Google",
          orContinueWith: "Or continue with",
          continue: "Continue",
          noAccount: "Don't have an account?",
          createOne: "Create one",
        },
        register: {
          title: "Create your private ritual",
          subtitle:
            "Build a refined routine space in a few seconds and make it yours.",
          creatingAccount: "Creating account...",
          createAccount: "Create account",
          alreadyHaveAccount: "Already have an account?",
          signIn: "Sign in",
        },
        password: {
          title: "Welcome back",
          subtitle: "Enter your password to reopen your SkinTrack ritual.",
          signingIn: "Signing in...",
          signIn: "Sign in",
        },
      },
      home: {
        eyebrow: "Bathroom",
        greeting: "Hello, {{name}}",
        guest: "there",
        heroSubtitle:
          "A lighter routine, a clearer ritual, and a better skin day.",
        heroProgressLabel: "Routine health",
        checkInEyebrow: "Daily check-in",
        checkInTitle: "Routine today",
        checkInSubtitle: "Capture today's ritual in one tap.",
        checkInYesSubtitle: "Logged and feeling consistent.",
        checkInNoSubtitle: "Skip today and reset tonight.",
        yes: "Yes",
        no: "No",
        consistencyLabel: "Consistency",
        consistencyValue: "{{count}} days",
        routineEyebrow: "Daily flow",
        morningTitle: "Morning routine",
        nightTitle: "Night routine",
        featureEyebrow: "Editorial pick",
        featureTitle: "Your calm-skin rhythm is ready.",
        featureBody:
          "Keep the routine soft, layer from fluid to cream, and lean on barrier support when skin feels reactive.",
        featureAction: "Open",
        actionToday: "Today",
        actionTonight: "Tonight",
        recommendationEyebrow: "For you",
        recommendationTitle: "Recommended products",
        actionForYou: "Curated",
        tip: {
          eyebrow: "Tip of the day",
          title: "Layer light to rich",
          body: "Apply watery textures first, then serum, then cream.",
          compact: "Water first. Cream last.",
          dismiss: "Got it",
        },
      },
      nav: {
        bathroom: "Bathroom",
        search: "Search",
        scan: "Scan",
        calendar: "Calendar",
        profile: "Profile",
      },
      search: {
        title: "Search",
        subtitle: "Find products, brands, and ingredients.",
        placeholder: "Search products or ingredients",
        discoveryEyebrow: "Discovery",
        discoveryTitle: "Build a shelf that fits the way your skin feels.",
        discoveryBody:
          "Start with a product type, concern, or finish and SkinTrack will narrow the field.",
        defaultEyebrow: "Browse",
        defaultTitle: "Start here",
        defaultSubtitle: "Try a product, brand, or skin concern.",
        resultsEyebrow: "Matches",
        resultsTitle: "Results",
        resultsCount: "{{count}} matches",
        emptyTitle: "No match yet",
        emptyBody: "Try another product, brand, or ingredient.",
      },
      calendar: {
        title: "Routine calendar",
        subtitle:
          "Your visual habit tracker is coming soon with ritual history and rhythm insights.",
        preview:
          "Expect a premium streak view, daily check-ins, and a clearer picture of your skincare consistency.",
        todayTitle: "Today's routine",
        todaySubtitle: "A clearer day view for the steps that matter.",
        stepsLabel: "Steps",
        stepsTitle: "Routine agenda",
        completedLabel: "Completed",
        shareTitle: "Share your experience.",
        shareBody:
          "Explore gentle routines from other users and compare what keeps their skin balanced.",
        explore: "Explore",
        weekdays: {
          mon: "Mon",
          tue: "Tue",
          wed: "Wed",
          thu: "Thu",
          fri: "Fri",
        },
      },
      scan: {
        title: "Product scan",
        subtitle:
          "Align the barcode and SkinTrack will capture it in one pass.",
        checkingPermission: "Checking camera permission...",
        permissionRequired: "Camera permission is required to scan a barcode.",
        allowCameraAccess: "Allow camera access",
        permissionBlocked:
          "Camera access is disabled. Enable it in Settings to scan a barcode.",
        openSettings: "Open Settings",
        settingsUnavailable:
          "Settings cannot be opened on this device right now.",
        placeBarcode: "Place the barcode inside the frame",
        scannedCode: "Scanned code",
        scanAgain: "Scan again",
        readyEyebrow: "Scanner ready",
        readyTitle: "Hold the pack steady.",
        readyBody:
          "Keep the barcode inside the frame and SkinTrack will lock as soon as it reads a valid code.",
        tipEyebrow: "Best light",
        lightTip:
          "Use soft, even light and avoid glare on glossy packaging for faster detection.",
      },
      profile: {
        title: "Your profile",
        status: "Daily ritual member",
        statusBody: "Calm, consistent, and saved in your own routine space.",
        skinSummary: "Skin health",
        preferencesEyebrow: "Preferences",
        preferencesTitle: "Preferences",
        preferencesSubtitle: "Your daily setup.",
        supportEyebrow: "Support",
        supportTitle: "Support",
        supportSubtitle: "Help and privacy.",
        settings: "Settings",
        privacy: "Privacy",
        help: "Help",
        disconnect: "Disconnect",
        language: {
          title: "Language",
          subtitle: "Choose the app language.",
        },
        theme: {
          title: "Appearance",
          subtitle: "Choose how the app looks.",
          options: {
            system: "System",
            light: "Light",
            dark: "Dark",
          },
        },
      },
      validation: {
        enterEmail: "Please enter an email.",
        validEmail: "Please enter a valid email.",
        missingCredentials: "Missing credentials.",
        firstnameRequired: "First name is required.",
        fillAllFields: "Please fill in all fields.",
        passwordMin: "Password must be at least 8 characters.",
        passwordComplex:
          "Password must include uppercase, lowercase, number and special character.",
      },
      errors: {
        unexpected: "Unexpected error occurred.",
        fetchAccountFailed: "Failed to fetch account.",
        loginFailed: "Login failed.",
        noTokenReceived: "No token received from server.",
        emptyAuthToken: "Cannot persist an empty auth token.",
        registrationFailed: "Registration failed.",
        unableToRegisterRightNow: "Unable to register right now.",
        notAuthenticated: "Not authenticated.",
        fetchProfileFailed: "Failed to fetch profile.",
        googleMobileOnly:
          "Google sign-in is only available on iOS and Android.",
        googleNotConfigured:
          "Google sign-in is not configured. Missing {{envVar}}.",
        googleNotReady: "Google sign-in is not ready yet.",
        googleSignInFailed: "Google sign-in failed.",
        googleIdTokenMissing: "Google sign-in did not return an ID token.",
      },
    },
  },
  fr: {
    translation: {
      common: {
        comingSoon: "Bientôt disponible",
        preview: "Aperçu",
        languages: {
          en: "Anglais",
          fr: "Français",
        },
      },
      auth: {
        heroPrivate: "Rituel p",
        heroTrackTitle: "Suivi",
        heroTrackBody:
          "Gardez chaque étape skincare dans un espace calme et clair.",
        heroScanTitle: "Scan",
        heroScanBody:
          "Enregistrez plus vite les produits et les détails de routine.",
        fields: {
          firstnameLabel: "Prénom",
          firstnamePlaceholder: "Jean",
          emailLabel: "E-mail",
          emailPlaceholder: "exemple@mail.com",
          passwordLabel: "Mot de passe",
          passwordPlaceholder: "••••••••",
        },
        login: {
          title: "Votre routine, étape par étape.",
          subtitle:
            "Suivez chaque routine, scannez vos produits et gardez vos routines au même endroit.",
          findingAccount: "Recherche du compte...",
          googleButtonA11yLabel: "Continuer avec Google",
          orContinueWith: "Ou continuer avec",
          continue: "Continuer",
          noAccount: "Vous n'avez pas de compte ?",
          createOne: "Créer un compte",
        },
        register: {
          title: "Créez votre rituel privé",
          subtitle:
            "Créez un espace routine raffiné en quelques secondes et faites-le vôtre.",
          creatingAccount: "Création du compte...",
          createAccount: "Créer un compte",
          alreadyHaveAccount: "Vous avez déjà un compte ?",
          signIn: "Se connecter",
        },
        password: {
          title: "Bon retour",
          subtitle:
            "Entrez votre mot de passe pour retrouver votre rituel SkinTrack.",
          signingIn: "Connexion en cours...",
          signIn: "Se connecter",
        },
      },
      home: {
        eyebrow: "Accueil",
        greeting: "Bonjour, {{name}}",
        guest: "vous",
        heroSubtitle:
          "Une routine plus légère, un rituel plus clair, et une meilleure journée pour la peau.",
        heroProgressLabel: "Santé routine",
        checkInEyebrow: "Check-in du jour",
        checkInTitle: "Routine du jour",
        checkInSubtitle: "Capturez le rituel du jour en un tap.",
        checkInYesSubtitle: "Ajoutée et bien tenue.",
        checkInNoSubtitle: "Pas aujourd'hui, reprise ce soir.",
        yes: "Oui",
        no: "Non",
        consistencyLabel: "Régularité",
        consistencyValue: "{{count}} jours",
        routineEyebrow: "Rythme quotidien",
        morningTitle: "Routine du matin",
        nightTitle: "Routine du soir",
        featureEyebrow: "Sélection éditoriale",
        featureTitle: "Votre rythme peau apaisée est prêt.",
        featureBody:
          "Gardez la routine légère, appliquez du plus fluide au plus riche et misez sur la barrière quand la peau réagit.",
        featureAction: "Ouvrir",
        actionToday: "Aujourd'hui",
        actionTonight: "Ce soir",
        recommendationEyebrow: "Pour vous",
        recommendationTitle: "Produits recommandés",
        actionForYou: "Sélection",
        tip: {
          eyebrow: "Conseil du jour",
          title: "Du léger au riche",
          body: "Commencez par l'eau, puis le sérum, puis la crème.",
          compact: "Eau d'abord. Crème en dernier.",
          dismiss: "Compris",
        },
      },
      nav: {
        bathroom: "Accueil",
        search: "Recherche",
        scan: "Scan",
        calendar: "Calendrier",
        profile: "Profil",
      },
      search: {
        title: "Recherche",
        subtitle: "Trouvez produits, marques et ingrédients.",
        placeholder: "Rechercher un produit ou ingrédient",
        discoveryEyebrow: "Découverte",
        discoveryTitle:
          "Construisez une routine qui suit vraiment l'état de votre peau.",
        discoveryBody:
          "Commencez par un type de produit, un besoin ou un fini, et SkinTrack affine la sélection.",
        defaultEyebrow: "Parcourir",
        defaultTitle: "Pour commencer",
        defaultSubtitle: "Essayez un produit, une marque ou un besoin.",
        resultsEyebrow: "Résultats",
        resultsTitle: "Résultats",
        resultsCount: "{{count}} résultats",
        emptyTitle: "Aucun résultat",
        emptyBody: "Essayez un autre produit, une marque ou un ingrédient.",
      },
      calendar: {
        title: "Calendrier routine",
        subtitle:
          "Votre suivi visuel d'habitudes arrive bientôt avec l'historique des rituels et des insights de rythme.",
        preview:
          "Bientôt : vue premium des séries, check-ins quotidiens et vision plus claire de votre régularité skincare.",
        todayTitle: "Routine du jour",
        todaySubtitle:
          "Une vue plus claire des étapes qui comptent aujourd'hui.",
        stepsLabel: "Étapes",
        stepsTitle: "Agenda routine",
        completedLabel: "Terminées",
        shareTitle: "Partagez votre expérience.",
        shareBody:
          "Explorez des routines douces d'autres utilisateurs et comparez ce qui garde leur peau équilibrée.",
        explore: "Explorer",
        weekdays: {
          mon: "Lun",
          tue: "Mar",
          wed: "Mer",
          thu: "Jeu",
          fri: "Ven",
        },
      },
      scan: {
        title: "Scan produit",
        subtitle:
          "Alignez le code-barres et SkinTrack le capturera en un seul passage.",
        checkingPermission: "Vérification de l'autorisation de la caméra...",
        permissionRequired:
          "L'autorisation de la caméra est requise pour scanner un code-barres.",
        allowCameraAccess: "Autoriser l'accès à la caméra",
        permissionBlocked:
          "L'accès à la caméra est désactivé. Activez-le dans Réglages pour scanner un code-barres.",
        openSettings: "Ouvrir Réglages",
        settingsUnavailable:
          "Impossible d'ouvrir les Réglages sur cet appareil pour le moment.",
        placeBarcode: "Placez le code-barres dans le cadre",
        scannedCode: "Code scanné",
        scanAgain: "Scanner à nouveau",
        readyEyebrow: "Scanner prêt",
        readyTitle: "Tenez le produit bien stable.",
        readyBody:
          "Gardez le code-barres dans le cadre et SkinTrack validera dès qu'un code valable est détecté.",
        tipEyebrow: "Bonne lumière",
        lightTip:
          "Utilisez une lumière douce et régulière et évitez les reflets sur les emballages brillants.",
      },
      profile: {
        title: "Votre profil",
        status: "Membre rituel quotidien",
        statusBody:
          "Calme, régulier et enregistré dans votre propre espace routine.",
        skinSummary: "Santé peau",
        preferencesEyebrow: "Préférences",
        preferencesTitle: "Préférences",
        preferencesSubtitle: "Votre configuration quotidienne.",
        supportEyebrow: "Support",
        supportTitle: "Support",
        supportSubtitle: "Aide et confidentialité.",
        settings: "Paramètres",
        privacy: "Confidentialité",
        help: "Aide",
        disconnect: "Se déconnecter",
        language: {
          title: "Langue",
          subtitle: "Choisissez la langue de l'app.",
        },
        theme: {
          title: "Apparence",
          subtitle: "Choisissez le mode de l'app.",
          options: {
            system: "Système",
            light: "Clair",
            dark: "Sombre",
          },
        },
      },
      validation: {
        enterEmail: "Veuillez entrer un e-mail.",
        validEmail: "Veuillez entrer un e-mail valide.",
        missingCredentials: "Identifiants manquants.",
        firstnameRequired: "Le prénom est requis.",
        fillAllFields: "Veuillez remplir tous les champs.",
        passwordMin: "Le mot de passe doit contenir au moins 8 caractères.",
        passwordComplex:
          "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.",
      },
      errors: {
        unexpected: "Une erreur inattendue s'est produite.",
        fetchAccountFailed: "Impossible de récupérer le compte.",
        loginFailed: "Échec de la connexion.",
        noTokenReceived: "Aucun jeton reçu du serveur.",
        emptyAuthToken:
          "Impossible d'enregistrer un jeton d'authentification vide.",
        registrationFailed: "Échec de l'inscription.",
        unableToRegisterRightNow: "Impossible de vous inscrire pour le moment.",
        notAuthenticated: "Vous n'êtes pas connecté.",
        fetchProfileFailed: "Impossible de récupérer le profil.",
        googleMobileOnly:
          "La connexion Google est disponible uniquement sur iOS et Android.",
        googleNotConfigured:
          "La connexion Google n'est pas configurée. Variable manquante : {{envVar}}.",
        googleNotReady: "La connexion Google n'est pas encore prête.",
        googleSignInFailed: "Échec de la connexion Google.",
        googleIdTokenMissing:
          "La connexion Google n'a pas renvoyé de jeton d'identité.",
      },
    },
  },
} as const;
