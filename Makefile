-include .env
export 

VUE_APP_VERSION := $(shell git rev-parse --short HEAD)

start:
	@yarn serve

