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
        comingSoon: "Coming Soon!",
        comingSoonPatience: "Be patient, it will come...",
        preview: "Preview",
        back: "Go back",
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
          titleWithFirstname: "Welcome back, {{firstname}}",
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
        heroProgressLabel: "Sugar-free challenge",
        checkInEyebrow: "Daily check-in",
        checkInTitle: "Have you applied your skincare this morning?",
        checkInSubtitle:
          "Confirm your routine to keep your skin glowing and extend your streak.",
        checkInYesSubtitle: "Routine logged. Your glow stays on track.",
        checkInNoSubtitle: "Not yet. You can still catch up tonight.",
        yes: "Yes, it's done",
        no: "Not yet",
        consistencyLabel: "Current streak",
        consistencyValue: "{{count}} days",
        daysUnit: "days",
        routineEyebrow: "Daily flow",
        morningTitle: "Morning",
        nightTitle: "Evening",
        featureEyebrow: "Tip of the day",
        featureTitle:
          '"Apply your serums on slightly damp skin to lock in hydration and improve absorption."',
        featureBody:
          "Hydration holds better when you layer before the skin fully dries.",
        featureAction: "Open",
        actionToday: "Today",
        actionTonight: "Tonight",
        recommendationEyebrow: "For you",
        recommendationTitle: "For you",
        actionForYou: "See all",
        stepsCount: "{{count}} steps",
        productTypes: {
          cleanser: "Cleanser",
          moisturizer: "Moisturizer",
          serum: "Serum",
          peeling: "Peeling",
          mask: "Mask",
          makeupRemover: "Balm",
          toner: "Lotion",
          acnePatch: "Patch",
          eyecream: "Eye care",
        },
        tip: {
          eyebrow: "Tip of the day",
          title: "Serum on damp skin",
          body: "Apply serum before skin fully dries so hydration stays sealed in longer.",
          compact: "Damp skin. Better absorption.",
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
        openFullCalendar: "Open full calendar",
        closeFullCalendar: "Close full calendar",
        previousMonth: "Previous month",
        nextMonth: "Next month",
        previousYear: "Previous year",
        nextYear: "Next year",
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
        comingSoon: "Bientôt disponible !",
        comingSoonPatience: "Un peu de patience, ça arrive...",
        preview: "Aperçu",
        back: "Retour",
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
          firstnamePlaceholder: "Marie",
          emailLabel: "E-mail",
          emailPlaceholder: "exemple@mail.com",
          passwordLabel: "Mot de passe",
          passwordPlaceholder: "••••••••",
        },
        login: {
          title: "Votre routine, étape par étape.",
          subtitle:
            "Suivez chaque routine de soin, scannez vos produits et améliorer votre peau de jour en jour.",
          findingAccount: "Recherche du compte...",
          googleButtonA11yLabel: "Continuer avec Google",
          orContinueWith: "Ou continuer avec",
          continue: "Continuer",
          noAccount: "Vous n'avez pas de compte ?",
          createOne: "Créer un compte",
        },
        register: {
          title: "Créez votre espace",
          subtitle:
            "Démarrez votre suivi dès aujourd’hui pour une routine enfin maîtrisée.",
          creatingAccount: "Création du compte...",
          createAccount: "Créer un compte",
          alreadyHaveAccount: "Vous avez déjà un compte ?",
          signIn: "Se connecter",
        },
        password: {
          title: "Bon retour !",
          titleWithFirstname: "Bon retour {{firstname}} !",
          subtitle: "Entrez votre mot de passe pour retrouver votre suivi.",
          signingIn: "Connexion en cours...",
          signIn: "Se connecter",
        },
      },
      home: {
        eyebrow: "Accueil",
        greeting: "Bonjour, {{name}}",
        guest: "vous",
        heroSubtitle: "Prenons soin de vous aujourd'hui",
        heroProgressLabel: "Défi Sans Sucre",
        checkInEyebrow: "Rappel",
        checkInTitle: "Avez-vous fait votre routine de soin ce matin ?",
        checkInSubtitle:
          "Validez votre routine pour maintenir votre peau éclatante et prolonger votre série.",
        checkInYesSubtitle: "Routine validée. Votre série continue.",
        checkInNoSubtitle: "Pas encore. Vous pourrez la valider ce soir.",
        yes: "Oui, c'est fait !",
        no: "Pas encore",
        consistencyLabel: "Série en cours",
        consistencyValue: "{{count}} jours",
        daysUnit: "jours",
        routineEyebrow: "Rythme quotidien",
        morningTitle: "Matin",
        nightTitle: "Soir",
        featureEyebrow: "Le conseil du jour",
        featureTitle:
          '"Appliquez vos sérums sur peau légèrement humide pour emprisonner l\'hydratation et maximiser leur efficacité."',
        featureBody: "Sur peau encore souple, l'hydratation se fixe mieux.",
        featureAction: "Ouvrir",
        actionToday: "Aujourd'hui",
        actionTonight: "Ce soir",
        recommendationEyebrow: "Pour vous",
        recommendationTitle: "Pour vous",
        actionForYou: "Tout voir",
        stepsCount: "{{count}} étapes",
        productTypes: {
          cleanser: "Nettoyant",
          moisturizer: "Hydratant",
          serum: "Sérum",
          peeling: "Peeling",
          mask: "Masque",
          makeupRemover: "Baume",
          toner: "Lotion",
          acnePatch: "Patch",
          eyecream: "Contour yeux",
        },
        tip: {
          eyebrow: "Conseil du jour",
          title: "Sérum sur peau humide",
          body: "Appliquez votre sérum avant que la peau sèche pour conserver l'hydratation plus longtemps.",
          compact: "Peau humide. Meilleure absorption.",
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
        openFullCalendar: "Ouvrir le calendrier complet",
        closeFullCalendar: "Fermer le calendrier complet",
        previousMonth: "Mois précédent",
        nextMonth: "Mois suivant",
        previousYear: "Année précédente",
        nextYear: "Année suivante",
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
