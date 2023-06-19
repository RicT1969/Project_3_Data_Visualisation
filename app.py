from flask import Flask, render_template, jsonify
import psycopg2

app = Flask(__name__)

# Create a database connection
conn = psycopg2.connect(
    host='your_host',
    port='5432',
    user='your_username',
    password='your_password',
    database='your_database'
)

# Route to serve the web page
@app.route('/')
def index():
    return render_template('index.html')

# Route to fetch data from the database
@app.route('/earthquakes')
def get_earthquakes():
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM earthquakes')
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)






