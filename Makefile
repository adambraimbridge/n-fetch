include n.Makefile

unit-test:
	@mocha --recursive test
	@$(DONE)

test: verify unit-test
	@$(DONE)

