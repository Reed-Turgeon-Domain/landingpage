phony: i ri

# PACKAGES ####################################################################
i:
	npm install

ri:
	rm -rf node_modules package-lock.json
	make i

# STORYBOOK ###################################################################
storybook:
	npm run storybook

build-storybook:
	npm run build-storybook

# DEVELOPMENT #################################################################
dev:
	npm run dev