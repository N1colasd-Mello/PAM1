# Programa-o-de-Aplicativos-Mobile
package com.example.bryan

import ...

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun login(view: View) {

        val email = findViewById<EditText>(R.id.log_email).text.toString()
        val senha = findViewById<EditText>(R.id.log_senha).text.toString()

        if (email == "lucas@hotmail.com" && senha == "abcd@1234") {

            Toast.makeText(this, email, Toast.LENGTH_SHORT).show("Logado com sucesso")

        } else {

            Toast.makeText(this, email, Toast.LENGTH_SHORT).show("Inválido")