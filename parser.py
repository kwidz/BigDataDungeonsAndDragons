import urllib.request
import re


def generURL(a):
	url = 'http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID='+str(a)
	return url



for i in range(1,3):
	url = generURL(i)
	req = urllib.request.Request(url)
	resp = urllib.request.urlopen(req)
	respData = resp.read()
	paragraphs = re.findall(r'<!-- START Spell -->(.*?)<!-- END Spell -->',str(respData))
	print(str(paragraphs))
	print()