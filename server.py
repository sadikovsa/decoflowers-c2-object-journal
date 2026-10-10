import argparse,http.server,os
p=argparse.ArgumentParser();p.add_argument('--host',default='0.0.0.0');p.add_argument('--port',type=int,default=4173);p.add_argument('--strictPort',action='store_true');args=p.parse_args();os.chdir(os.path.join(os.path.dirname(__file__),'dist'));http.server.ThreadingHTTPServer((args.host,args.port),http.server.SimpleHTTPRequestHandler).serve_forever()
