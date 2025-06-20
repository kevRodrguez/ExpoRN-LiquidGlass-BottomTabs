# Bottom Tab con efecto Liquid Glass en iOS

Este proyecto implementa una barra de navegación inferior (bottom tab) con efecto "liquid glass" en iOS, utilizando React Native, Expo Router y la librería [@RNBottomTabs](https://github.com/callstack/rnef).

## Recursos utilizados

- [@RNBottomTabs](https://github.com/callstack/rnef)
- [Guía de integración con Expo Router](https://callstackincubator.github.io/react-native-bottom-tabs/docs/guides/usage-with-expo-router.html)

## Estructura principal

La navegación de pestañas se implementa en el archivo `app/(tabs)/_layout.tsx` usando el adaptador de Expo Router para los tabs nativos:

```tsx
import { withLayoutContext } from 'expo-router';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';

const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

const Tabs = withLayoutContext(BottomTabNavigator);

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: () => ({ sfSymbol: 'house' }),
          tabBarLabel: '', // Oculta el texto
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Agregar',
          tabBarIcon: () => ({ sfSymbol: 'plus' }),
          tabBarLabel: '',
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Perfil',
          tabBarIcon: () => ({ sfSymbol: 'flag' }),
          tabBarLabel: '',
        }}
      />
    </Tabs>
  );
}
```

## Notas de implementación

- **Solo iconos:** Para que solo se muestren los iconos y no el texto, se usa `tabBarLabel: ''` en cada tab.
- **Centrado de iconos:** Si notas que los iconos no están perfectamente centrados, es por el espacio reservado para el label. Actualmente, la librería no expone una opción global para ocultar el label, pero este workaround funciona visualmente.
- **Efecto Liquid Glass:** El efecto visual de "liquid glass" depende del sistema operativo iOS y el estilo nativo de la barra de pestañas. Si quieres personalizar aún más el fondo, puedes usar la opción `tabBarStyle` para aplicar transparencias o desenfoques.

## Recursos adicionales

- [Documentación oficial de RNBottomTabs](https://callstackincubator.github.io/react-native-bottom-tabs/docs/guides/usage-with-expo-router.html)
- [Ejemplo de integración con Expo Router](https://callstackincubator.github.io/react-native-bottom-tabs/docs/guides/usage-with-expo-router.html)

---

> Proyecto realizado con Expo Router y [@RNBottomTabs](https://github.com/callstack/rnef) para una experiencia nativa y moderna en iOS.
