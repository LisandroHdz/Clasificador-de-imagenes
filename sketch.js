// Teachable Machine

// https://editor.p5js.org/

//video
let video;
// label para mostrar la palabra esperando
let label = "Esperando...";
// el clasificador
let classifier;
//url del modelo de teachable machine
let modelURL = 'https://teachablemachine.withgoogle.com/models/itUPqnJqk/';

//paso 1: cargar el modelo!
function preload(){
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

//setup del canvas para visualizar el video de la camara
function setup (){
  createCanvas (640, 520);
  //crear el video
  video = createCapture(VIDEO);
  video.hide();
  // Paso 2: empezar la clasificación llamado a la función
  classifyVideo();
}

//Paso 2 classificar el video!
function classifyVideo (){
  classifier.classify(video, gotResults);
}

function draw (){
  background(0);


  //dibujar el video
  image (video, 0, 0);

  //paso 4: dibujar el label correspondiente
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  //escoger un emoji por defecto y asignar los demas

  let emoji = "⏱";
  let mensaje = "";
  if(label == "LIBRO"){
    emoji = "📒";
    mensaje = "ESO ES UN";
  }else if (label == "BOTELLA"){
    emoji = "🧴";
    mensaje = "ESO ES UNA";
  }else if (label == "MERMELADA"){
    emoji = "🥫";
    mensaje = "ESO ES UNA";
  }

  // Dibujar el emoticon
  textSize(256);
  text(emoji, width / 2, height / 2);
  textSize(32);
  text(mensaje, width / 2, height / 1.2);
}

// Paso 3: obtener los resultados de la clasificación
function gotResults (error, results){
  // capturan error por si algo sale mal
  if(error) {
    console.error(error);
    return;
  }
  //mostrar en consola los resultados de la clasificación
  console.log(results)
  //asignar a label el valor mayor de la clasificación y seguir clasificando
  label = results[0].label;
  classifyVideo();
}
