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
        languages: {
          en: "English",
          fr: "French",
        },
      },
      auth: {
        fields: {
          firstnameLabel: "First name",
          firstnamePlaceholder: "John",
          emailLabel: "Email",
          emailPlaceholder: "example@mail.com",
          passwordLabel: "Password",
          passwordPlaceholder: "••••••••",
        },
        login: {
          title: "Welcome",
          subtitle: "Sign in to continue",
          findingAccount: "Finding account...",
          orContinueWith: "Or continue with",
          continue: "Continue",
          noAccount: "Don't have an account?",
          createOne: "Create one",
        },
        register: {
          title: "Create an account",
          subtitle: "Get started in a few seconds",
          creatingAccount: "Creating account...",
          createAccount: "Create account",
          alreadyHaveAccount: "Already have an account?",
          signIn: "Sign in",
        },
        password: {
          title: "We found your account!",
          subtitle: "Enter your password to continue",
          signingIn: "Signing in...",
          signIn: "Sign in",
        },
      },
      home: {
        title: "SkinTrack",
        greeting: "Hi {{name}} 👋",
        guest: "Guest",
        streak: "Streak: {{count}} days in a row",
        question: "Did you apply your skincare tonight?",
        yes: "Yes",
        no: "No",
        searchPlaceholder: "Search products...",
        routineTitle: "Your Night Routine",
        steps: {
          one: "Step 1",
          two: "Step 2",
          three: "Step 3",
        },
        routine: {
          cleanser: "Cleanser",
          serum: "Serum",
          moisturizer: "Moisturizer",
          brandName: "Brand Name",
        },
      },
      nav: {
        bathroom: "Bathroom",
        search: "Search",
        scan: "Scan",
        calendar: "Calendar",
        profile: "Profile",
      },
      profile: {
        settings: "Settings",
        privacy: "Privacy",
        help: "Help",
        disconnect: "Disconnect",
        language: {
          title: "Language",
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
        languages: {
          en: "Anglais",
          fr: "Français",
        },
      },
      auth: {
        fields: {
          firstnameLabel: "Prénom",
          firstnamePlaceholder: "Jean",
          emailLabel: "E-mail",
          emailPlaceholder: "exemple@mail.com",
          passwordLabel: "Mot de passe",
          passwordPlaceholder: "••••••••",
        },
        login: {
          title: "Bienvenue",
          subtitle: "Connectez-vous pour continuer",
          findingAccount: "Recherche du compte...",
          orContinueWith: "Ou continuer avec",
          continue: "Continuer",
          noAccount: "Vous n'avez pas de compte ?",
          createOne: "Créer un compte",
        },
        register: {
          title: "Créer un compte",
          subtitle: "Commencez en quelques secondes",
          creatingAccount: "Création du compte...",
          createAccount: "Créer un compte",
          alreadyHaveAccount: "Vous avez déjà un compte ?",
          signIn: "Se connecter",
        },
        password: {
          title: "Nous avons trouvé votre compte !",
          subtitle: "Entrez votre mot de passe pour continuer",
          signingIn: "Connexion en cours...",
          signIn: "Se connecter",
        },
      },
      home: {
        title: "SkinTrack",
        greeting: "Bonjour {{name}} 👋",
        guest: "Invité",
        streak: "Série : {{count}} jours d'affilée",
        question: "Avez-vous appliqué votre routine ce soir ?",
        yes: "Oui",
        no: "Non",
        searchPlaceholder: "Rechercher des produits...",
        routineTitle: "Votre routine du soir",
        steps: {
          one: "Étape 1",
          two: "Étape 2",
          three: "Étape 3",
        },
        routine: {
          cleanser: "Nettoyant",
          serum: "Sérum",
          moisturizer: "Hydratant",
          brandName: "Nom de la marque",
        },
      },
      nav: {
        bathroom: "Salle de bain",
        search: "Recherche",
        scan: "Scan",
        calendar: "Calendrier",
        profile: "Profil",
      },
      profile: {
        settings: "Paramètres",
        privacy: "Confidentialité",
        help: "Aide",
        disconnect: "Se déconnecter",
        language: {
          title: "Langue",
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
