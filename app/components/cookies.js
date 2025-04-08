import * as CookieConsent from "vanilla-cookieconsent";
import { gtag } from "@next/third-parties/google";
/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */

CookieConsent.run({
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom left",
      transition: "slide",
      equalWeightButtons: true,
      flipButtons: true,
    },
    preferencesModal: {
      layout: "box",
      position: "left",
      transition: "slide",
      equalWeightButtons: true,
      flipButtons: true,
    },
  },

  categories: {
    necessary: {
      readOnly: true,
    },
    analytics: {},
  },
  language: {
    default: "ar",
    autoDetect: "browser",
    rtl: "ar",
    translations: {
      ar: {
        consentModal: {
          title: "مرحبًا أيها المسافر ، حان وقت ملفات تعريف الارتباط!",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          acceptAllBtn: "رفض كل شيء",
          acceptNecessaryBtn: "قبول الكل",
          showPreferencesBtn: "إدارة التفضيلات",
          footer:
            '<a href="#link">سياسة الخصوصية</a>\n<a href="#link">الأحكام والشروط</a>',
        },
        preferencesModal: {
          title: "مركز تفضيلات الموافقة",
          acceptAllBtn: "رفض كل شيء",
          acceptNecessaryBtn: "قبول الكل",
          savePreferencesBtn: "حفظ التفضيلات",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "خدمة|خدمات",
          sections: [
            {
              title: "استخدام ملفات تعريف الارتباط",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              title:
                'ملفات تعريف الارتباط الضرورية للغاية <span class="pm__badge">ممكّن دائمًا</span>',
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "necessary",
            },
            {
              title: "ملفات تعريف الارتباط التحليلية",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "analytics",
            },
            {
              title: "معلومات اكثر",
              description:
                'لأي استفسار يتعلق بسياستي الخاصة بملفات تعريف الارتباط وخياراتك ، يرجى  <a class="cc__link" href="#yourdomain.com">الاتصال بي</a>.',
            },
          ],
        },
      },
      de: {
        consentModal: {
          title: "Hallo Reisende, es ist Kekszeit!",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Alle ablehnen",
          showPreferencesBtn: "Einstellungen verwalten",
          footer:
            '<a href="#link">Datenschutz</a>\n<a href="#link">Bedingungen und Konditionen</a>',
        },
        preferencesModal: {
          title: "Präferenzen für die Zustimmung",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Alle ablehnen",
          savePreferencesBtn: "Einstellungen speichern",
          closeIconLabel: "Modal schließen",
          serviceCounterLabel: "Dienstleistungen",
          sections: [
            {
              title: "Verwendung von Cookies",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              title:
                'Streng Notwendige Cookies <span class="pm__badge">Immer Aktiviert</span>',
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "necessary",
            },
            {
              title: "Analytische Cookies",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "analytics",
            },
            {
              title: "Weitere Informationen",
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
            },
          ],
        },
      },
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          footer:
            '<a href="#link">Privacy Policy</a>\n<a href="#link">Terms and conditions</a>',
        },
        preferencesModal: {
          title: "Consent Preferences Center",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Cookie Usage",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "necessary",
            },
            {
              title: "Analytics Cookies",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "analytics",
            },
            {
              title: "More information",
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
            },
          ],
        },
      },
      es: {
        consentModal: {
          title: "Hola viajero, es la hora de las galletas!",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          acceptAllBtn: "Aceptar todo",
          acceptNecessaryBtn: "Rechazar todo",
          showPreferencesBtn: "Gestionar preferencias",
          footer:
            '<a href="#link">Política de privacidad</a>\n<a href="#link">Términos y condiciones</a>',
        },
        preferencesModal: {
          title: "Preferencias de Consentimiento",
          acceptAllBtn: "Aceptar todo",
          acceptNecessaryBtn: "Rechazar todo",
          savePreferencesBtn: "Guardar preferencias",
          closeIconLabel: "Cerrar modal",
          serviceCounterLabel: "Servicios",
          sections: [
            {
              title: "Uso de Cookies",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              title:
                'Cookies Estrictamente Necesarias <span class="pm__badge">Siempre Habilitado</span>',
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "necessary",
            },
            {
              title: "Cookies Analíticas",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "analytics",
            },
            {
              title: "Más información",
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
            },
          ],
        },
      },
      fr: {
        consentModal: {
          title: "Bonjour voyageur, c'est l'heure des cookies!",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Tout rejeter",
          showPreferencesBtn: "Gérer les préférences",
          footer:
            '<a href="#link">Politique de confidentialité</a>\n<a href="#link">Termes et conditions</a>',
        },
        preferencesModal: {
          title: "Préférences de cookies",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Tout rejeter",
          savePreferencesBtn: "Sauvegarder les préférences",
          closeIconLabel: "Fermer la modale",
          serviceCounterLabel: "Services",
          sections: [
            {
              title: "Utilisation des Cookies",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              title:
                'Cookies Strictement Nécessaires <span class="pm__badge">Toujours Activé</span>',
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "necessary",
            },
            {
              title: "Cookies Analytiques",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "analytics",
            },
            {
              title: "Plus d'informations",
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
            },
          ],
        },
      },
      it: {
        consentModal: {
          title: "Ciao viaggiatore, è tempo di biscotti!",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          acceptAllBtn: "Accetta tutto",
          acceptNecessaryBtn: "Rifiuta tutto",
          showPreferencesBtn: "Gestisci preferenze",
          footer:
            '<a href="#link">Informativa sulla privacy</a>\n<a href="#link">Termini e condizioni</a>',
        },
        preferencesModal: {
          title: "Centro preferenze per il consenso",
          acceptAllBtn: "Accetta tutto",
          acceptNecessaryBtn: "Rifiuta tutto",
          savePreferencesBtn: "Salva le preferenze",
          closeIconLabel: "Chiudi la finestra",
          serviceCounterLabel: "Servizi",
          sections: [
            {
              title: "Utilizzo dei Cookie",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              title:
                'Cookie Strettamente Necessari <span class="pm__badge">Sempre Attivati</span>',
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "necessary",
            },
            {
              title: "Cookie Analitici",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "analytics",
            },
            {
              title: "Ulteriori informazioni",
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
            },
          ],
        },
      },
    },
  },
  onFirstAction: function (user_preferences, cookie) {
    updateAnalytics(cc);
  },
  onChange: function (user_preferences, cookie) {
    updateAnalytics(cc);
  },
});

function updateAnalytics(cc) {
  if (cc.allowedCategory("analytics")) {
    gtag("consent", "update", { analytics_storage: "granted" });
  } else {
    gtag("consent", "update", { analytics_storage: "denied" });
  }
}

export default function CookiesComponent() {
  return (
    <a
      href="#"
      className="self-end text-white underline font-mono hover:text-blue-400"
      onClick={CookieConsent.showPreferences}
    >
      Cookies
    </a>
  );
}
