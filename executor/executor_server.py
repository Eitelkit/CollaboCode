import executor_utils as eu
import json
from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)

# test function
@app.route('/')
def hello():
    return 'hello world'

@app.route('/build_and_run', methods=['GET', 'POST'])
def build_and_run():
    data = json.loads(request.data)
    if 'code' not in data or 'lang' not in data:
        return 'You should provide both code and language!'
    code = data['code']
    lang = data['lang']

    print 'API got called with code %s in %s' %(code, lang)

    result = eu.build_and_run(code, lang)
    # convert object to json format string
    return jsonify(result)

# main function
# run program on command line: python executor_server.py
if __name__ == '__main__':
    import sys
    print("sys.argv[1]\n")
    print(sys.argv)
    # port = int(sys.argv[1])
    # load docker image
    eu.load_image()
    # monitoring the code change and recompile
    app.run(debug=True)
    # app.run(port=port)
