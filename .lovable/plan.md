

## Clarification : WhatsApp API vs lien WhatsApp

### Ce que vous avez actuellement
Le bouton WhatsApp utilise un **lien direct vers WhatsApp Web** (`web.whatsapp.com/send?phone=...`). C'est la méthode standard, gratuite, et ne nécessite aucune clé API. Quand un visiteur clique, il ouvre une conversation WhatsApp avec votre numéro et un message pré-rempli.

### L'API WhatsApp Business (officielle, payante)
L'API WhatsApp Business de Meta permet :
- Envoyer des messages automatiques (confirmations de devis, suivi de commande)
- Chatbots automatisés
- Intégration CRM
- Notifications proactives

**Pour l'obtenir :**
1. Créer un compte sur [Meta Business Suite](https://business.facebook.com)
2. S'inscrire à la **WhatsApp Business Platform** via Meta
3. Passer par un BSP (Business Solution Provider) comme Twilio, MessageBird, ou 360dialog
4. Obtenir une clé API et configurer un webhook

**Coût :** payant par conversation (variable selon le pays).

### Recommandation
Pour un site vitrine avec un simple bouton de contact, **le lien actuel est la bonne solution** — il fonctionne sans frais et sans configuration complexe. L'API Business n'est utile que si vous voulez automatiser les réponses ou envoyer des notifications.

Si le bouton ne s'ouvre pas correctement dans l'aperçu Lovable, c'est une limitation de l'environnement de prévisualisation — il fonctionnera correctement sur votre site publié.

