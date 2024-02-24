<template>
	<header class="header">
		<nav class="nav-group">
			<div class="hamburger-menu">
				<input id="menu__toggle" type="checkbox" />
				<label class="menu__btn" for="menu__toggle">
					<span></span>
				</label>
				<ul class="menu__box">
					<li><a class="menu__item" href="#">Projects</a></li>
					<li><a class="menu__item" href="#">Animations</a></li>
					<li><a class="menu__item" href="#">Features</a></li>
				</ul>
			</div>
			<ul class="nav-group__list">
				<li title="To projects" class="nav-group__item"><a href="#">Projects</a></li>
				<li title="To animations" class="nav-group__item"><a href="#">Animations</a></li>
				<li title="To features" class="nav-group__item"><a href="#">Features</a></li>
			</ul>
			<select
				title="Choose language"
				name="languages"
				id="languages"
				size="1"
				onchange="if (this.value) location.href=this.value">
				<option selected disabled>Languages</option>
				<option value="">🇬🇧</option>
				<option value="localizations/uk">🇺🇦</option>
				<option value="localizations/ru">🇷🇺</option>
				<option value="localizations/it">🇮🇹</option>
				<option value="localizations/de">🇩🇪</option>
			</select>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'Header',
};
</script>

<style></style>
