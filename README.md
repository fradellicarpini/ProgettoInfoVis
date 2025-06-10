# ProgettoInfoVis
🌸 Visualizzazione Interattiva di Dati Multivariati con D3.js
Questo progetto realizza una visualizzazione interattiva a fiori di un dataset multivariato, utilizzando la libreria D3.js. Ogni fiore rappresenta un data-case composto da quattro variabili quantitative positive. La visualizzazione consente all’utente di esplorare e ordinare dinamicamente i dati tramite un’interfaccia intuitiva.

# Obiettivo
Visualizzare 10 data-case, ognuno rappresentato da un fiore. Ogni caratteristica del fiore (petali, gambo, foglia, bocciolo) è proporzionale a una delle quattro variabili del dataset:

v1: dimensione dei petali
v2: lunghezza del gambo
v3: grandezza della foglia
v4: diametro del bocciolo

# Funzionalità
Disegno interattivo di 10 fiori distribuiti nell’area SVG;

Click su una componente del fiore per ordinare tutti i fiori lungo l’asse X secondo la variabile corrispondente;

Animazioni fluide nei cambi di posizione;

Colori personalizzati per ogni fiore;

Glow effect sui petali;

Asse X dinamico con etichetta variabile;

Tooltip dinamico al passaggio del mouse;

Pulsante di reset per riportare i fiori nella posizione iniziale;

Sfumatura rosa di sfondo + legenda esplicativa.

# Struttura dei file
index.html: contiene la struttura e lo stile della pagina web

main.js: contiene la logica per la generazione e interazione della visualizzazione D3

data.json: contiene il dataset con 10 oggetti, ciascuno con variabili v1, v2, v3, v4 e id


# Note tecniche
Tutte le scale sono dinamiche: i valori delle variabili possono essere modificati arbitrariamente nel file JSON e la visualizzazione si adatta automaticamente.


