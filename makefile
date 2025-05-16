phony: i ri

# PACKAGES ####################################################################
i:
	npm install

ri:
	rm -rf node_modules package-lock.json
	make i

dev:
	npm run dev