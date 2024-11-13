#include <SPI.h>
#include <MFRC522.h>
#include <WiFiManager.h>
#include <WiFiClientSecure.h>
#include <ESP32Servo.h>
#include <algorithm>
#include <string>


static const int servoPin = 4;
int aberto = 0;
int fechado = 90;
Servo servo1;

#define led 2
#define RST_PIN         22          // Configurable, see typical pin layout above
#define SS_PIN          5         // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance

const char *ssid = "RotSmart";          // Change this to your WiFi SSID
const char *password = "abcd12345e";

void setup() {
	Serial.begin(115200);		// Initialize serial communications with the PC
  servo1.attach(servoPin);
  pinMode(led, OUTPUT);
	while (!Serial);		// Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
	SPI.begin();			// Init SPI bus
	mfrc522.PCD_Init();		// Init MFRC522
	delay(4);				// Optional delay. Some board do need more time after init to be ready, see Readme
	mfrc522.PCD_DumpVersionToSerial();	// Show details of PCD - MFRC522 Card Reader details
	Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
   
  Serial.println();
  Serial.println("******************************************************");
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
byte* getID(){
  return mfrc522.uid.uidByte;
}

unsigned long lastTimeLoop = 0;
unsigned long timerDelayLoop = 3000;
bool abertoo = false;

void loop() {
  if ((millis() - lastTimeLoop) < timerDelayLoop) {
    return;
  }
  if(abertoo){
    servo1.write(fechado);
    abertoo = false;
  }


  //servo1.write(100);
	// Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  String conteudo= "";
  byte letra;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  conteudo.toUpperCase();
  Serial.println(conteudo.substring(1));

  String resultado = PostRequest(conteudo.substring(1));
  if(resultado == "true"){
    servo1.write(aberto);
    abertoo = true;
    delay(15);
    Serial.println("Liberado");
    digitalWrite(led,HIGH);
  }else if(resultado == "false"){
    servo1.write(fechado);
    delay(15);
    Serial.println("Negado");
    digitalWrite(led,LOW);
  }else{
    Serial.println("Sem Cadastro!");
  }
  lastTimeLoop = millis();
}
