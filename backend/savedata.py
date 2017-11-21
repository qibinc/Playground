import requests
import json

saveurl = "http://127.0.0.1:8000/blockly/save_toolbox"

for i in range(4):
    param = {"level":i}
    params = json.dumps(param)
    res = requests.post(saveurl, params)
    print(res.text)
    
level0 = "0000000000000000000000000800000000000000000000000000000900000000000000000000000000000000000000000000"
level1 = "0000000000000000000000000800000000000000000000000000000900000000000000000000000000000000000000000000"
level2 = "0000000000000000000000000000000000000000000002000000002920000000080000000000000000000000000000000000"
level3 = "0000000000100002021010000010001000001000100002120010000900001002180000000010000000001000001002020000"
level4 = "0200000002000000000000000000000000111000000010100000001110000000000000000000000000000000000900000008"
level5 = "0200000020000000000000000000000000111000000010100000001110000000000000000000000000000000000900000080"
level6 = "0000000000000100000000020002100000111000000010100000001110000019000800000000010000000000000000000000"
level7 = "0000000000090000210001110201000000200100001200000000102000000010020000000000200000000008100000001110"
level8 = "1111111111200020020101111111012120200101010111012101218101012101002101012111110101000000019111111111"
level9 = "1111000000100002000010010000811000000001000009000110200000000000000200020010000000000001010000000021"
level0 = "0000000000000100001000120200210100010000000012002100100000100120021000009001001000000000010008000000"

for j in range(11):
    param = {'level':str(j), 'maps':'level' + str(j)}
    params = json.dumps(param)
    res = requests.post("http://127.0.0.1:8000/sources/save_maps", params)
    print(res.text)
