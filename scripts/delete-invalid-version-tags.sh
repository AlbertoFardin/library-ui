#!/bin/bash

# Vai nella directory della tua repo (modifica o rimuovi se sei già lì)
cd .. || {
  echo "Errore: directory non trovata"; exit 1;
}

# Trova tutti i tag che NON corrispondono ai formati: v1.2.3 o v1.2.3-4
tags_to_delete=$(git tag | grep -Ev '^v[0-9]+\.[0-9]+\.[0-9]+(-[0-9]+)?$')

if [[ -z "$tags_to_delete" ]]; then
  echo "✅ Tutti i tag sono validi (vX.Y.Z o vX.Y.Z-N). Nessun tag da eliminare."
  exit 0
fi

# Mostra i tag che verranno eliminati
echo "⚠️ I seguenti tag NON rispettano la struttura 'vX.Y.Z' o 'vX.Y.Z-N':"
echo "$tags_to_delete"
echo

# Chiede conferma all’utente
read -p "Procedere con l'eliminazione locale e remota di questi tag? (s/n): " confirm
if [[ "$confirm" != "s" ]]; then
  echo "❌ Operazione annullata."
  exit 0
fi

# Elimina i tag localmente
echo
echo "🗑️ Eliminazione dei tag localmente..."
echo "$tags_to_delete" | xargs git tag -d

# Elimina i tag dal remoto
echo
echo "🚀 Eliminazione dei tag dal remoto (origin)..."
echo "$tags_to_delete" | xargs -n 1 -I {} git push origin :refs/tags/{}

# Aggiorna e pulisci i riferimenti locali
echo
echo "🔄 Aggiornamento dei riferimenti locali..."
git fetch --prune --tags

# Verifica finale
echo
echo "✅ Verifica: tag rimanenti non validi (dovrebbe essere vuoto)"
git tag | grep -Ev '^v[0-9]+\.[0-9]+\.[0-9]+(-[0-9]+)?$' || echo "✅ Tutti i tag ora sono nel formato corretto."
