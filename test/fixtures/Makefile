# To generate new certificates

default: ca1-cert.pem ca2-cert.pem \
	agent1-cert.pem agent1-key.pem \
	agent2-cert.pem agent2-key.pem \
	agent3-cert.pem agent3-key.pem \
	agent4-cert.pem agent4-key.pem

.PHONY: default

# private key (not protected)
%-key.pem:
	openssl genrsa -out $@ 4096

SSL=openssl

CERTARGS=req -x509 -sha256 -days 40000 -noenc

# default is self-signed certificates (ca and agent2)
%-cert.pem: %-key.pem
	$(SSL) $(CERTARGS) \
	-subj "/CN=$(@:-cert.pem=)" \
	-key $< \
	-out $@

# certs signed by ca need a CSR (signing request)
%.csr: %-key.pem
	$(SSL) req \
	-subj "/CN=($*)" \
	-key $< \
	-new \
	-out $@

# signed by ca1
agent1-cert.pem: agent1.csr ca1-key.pem ca1-cert.pem
	$(SSL) $(CERTARGS) \
	-in $< \
	-CAkey  ca1-key.pem \
	-CA ca1-cert.pem \
	-out $@

# signed by ca2
agent4-cert.pem agent3-cert.pem: ca2-key.pem ca2-cert.pem
	$(SSL) $(CERTARGS) \
	-in "$(@:-cert.pem=.csr)" \
	-CAkey  ca2-key.pem \
	-CA ca2-cert.pem \
	-out $@

agent3-cert.pem: agent3.csr
agent4-cert.pem: agent4.csr
