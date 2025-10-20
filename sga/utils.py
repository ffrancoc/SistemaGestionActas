

def json_response(status = '', data = None):
    return  {
        'status': status,
        'data': data
    }