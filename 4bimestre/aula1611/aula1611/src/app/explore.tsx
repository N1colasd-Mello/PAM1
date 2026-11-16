import { Image } from 'expo-image';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: { name: string } }[];
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
};

const API_URL = 'https://pokeapi.co/api/v2';

function formatName(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const controllerRef = useRef<AbortController | null>(null);
  const pokemonCountRef = useRef<number | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRandomPokemon = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      let pokemonCount = pokemonCountRef.current;

      if (pokemonCount === null) {
        const countResponse = await fetch(`${API_URL}/pokemon-species?limit=1`, {
          signal: controller.signal,
        });
        if (!countResponse.ok) {
          throw new Error('A PokéAPI não respondeu. Tente novamente.');
        }

        const countData = (await countResponse.json()) as { count?: number };
        if (!countData.count || countData.count < 1) {
          throw new Error('Não foi possível obter a lista de Pokémon.');
        }

        pokemonCount = countData.count;
        pokemonCountRef.current = pokemonCount;
      }

      const randomId = Math.floor(Math.random() * pokemonCount) + 1;
      const response = await fetch(`${API_URL}/pokemon/${randomId}`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error('Não foi possível carregar esse Pokémon. Tente novamente.');
      }

      const result = (await response.json()) as Pokemon;
      setPokemon(result);
    } catch (caughtError) {
      if (controller.signal.aborted) {
        return;
      }

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Ocorreu um erro ao consultar a PokéAPI.'
      );
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      void loadRandomPokemon();
    });

    return () => {
      cancelAnimationFrame(frameId);
      controllerRef.current?.abort();
    };
  }, [loadRandomPokemon]);

  const imageUrl =
    pokemon?.sprites.other?.['official-artwork']?.front_default ??
    pokemon?.sprites.front_default;

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Math.max(insets.top, Spacing.four),
          paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
        },
      ]}
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.page}>
        <ThemedText type="smallBold" style={styles.eyebrow}>
          DESCUBRA ALGO NOVO
        </ThemedText>
        <ThemedText type="title" style={styles.title}>
          Pokémon{'\n'}aleatório
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.description}>
          Conheça um Pokémon escolhido para você pela PokéAPI.
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.card}>
          {loading ? (
            <View style={styles.feedback}>
              <ActivityIndicator color="#3c87f7" size="large" />
              <ThemedText themeColor="textSecondary" style={styles.feedbackText}>
                Buscando Pokémon...
              </ThemedText>
            </View>
          ) : error ? (
            <View style={styles.feedback}>
              <ThemedText type="subtitle" style={styles.errorIcon}>
                !
              </ThemedText>
              <ThemedText type="smallBold" style={styles.errorTitle}>
                Não foi possível carregar
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.errorMessage}>
                {error}
              </ThemedText>
            </View>
          ) : pokemon ? (
            <>
              <View
                style={[
                  styles.artwork,
                  { backgroundColor: theme.backgroundSelected },
                ]}>
                <ThemedText type="smallBold" themeColor="textSecondary">
                  #{String(pokemon.id).padStart(3, '0')}
                </ThemedText>
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    contentFit="contain"
                    style={styles.image}
                    transition={200}
                  />
                ) : (
                  <ThemedText style={styles.imageFallback}>🎮</ThemedText>
                )}
              </View>

              <ThemedText type="subtitle" style={styles.pokemonName}>
                {formatName(pokemon.name)}
              </ThemedText>

              <View style={styles.types}>
                {pokemon.types
                  .slice()
                  .sort((a, b) => a.slot - b.slot)
                  .map(({ slot, type }) => (
                    <ThemedView
                      key={`${slot}-${type.name}`}
                      type="backgroundSelected"
                      style={styles.typeBadge}>
                      <ThemedText type="smallBold">
                        {formatName(type.name)}
                      </ThemedText>
                    </ThemedView>
                  ))}
              </View>

              <View style={styles.stats}>
                <View style={styles.stat}>
                  <ThemedText type="small" themeColor="textSecondary">
                    ALTURA
                  </ThemedText>
                  <ThemedText type="smallBold">{(pokemon.height / 10).toFixed(1)} m</ThemedText>
                </View>
                <View style={[styles.statDivider, { backgroundColor: theme.backgroundSelected }]} />
                <View style={styles.stat}>
                  <ThemedText type="small" themeColor="textSecondary">
                    PESO
                  </ThemedText>
                  <ThemedText type="smallBold">{(pokemon.weight / 10).toFixed(1)} kg</ThemedText>
                </View>
              </View>
            </>
          ) : null}
        </ThemedView>

        <Pressable
          accessibilityRole="button"
          disabled={loading}
          onPress={() => {
            setLoading(true);
            setError('');
            void loadRandomPokemon();
          }}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}>
          <ThemedText type="smallBold" style={styles.buttonText}>
            {error ? 'TENTAR NOVAMENTE' : 'GERAR OUTRO POKÉMON'}
          </ThemedText>
        </Pressable>

        <ThemedText type="small" themeColor="textSecondary" style={styles.attribution}>
          Dados fornecidos gratuitamente pela PokéAPI
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  page: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  eyebrow: {
    color: '#3c87f7',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: Spacing.two,
  },
  description: {
    marginTop: Spacing.two,
    maxWidth: 420,
  },
  card: {
    alignItems: 'center',
    borderRadius: Spacing.four,
    marginTop: Spacing.four,
    padding: Spacing.three,
  },
  feedback: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 270,
    padding: Spacing.three,
  },
  feedbackText: {
    marginTop: Spacing.three,
  },
  errorIcon: {
    alignItems: 'center',
    borderColor: '#ef4444',
    borderRadius: 24,
    borderWidth: 2,
    color: '#ef4444',
    height: 48,
    lineHeight: 44,
    textAlign: 'center',
    width: 48,
  },
  errorTitle: {
    marginTop: Spacing.three,
    textAlign: 'center',
  },
  errorMessage: {
    marginTop: Spacing.two,
    textAlign: 'center',
  },
  artwork: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: Spacing.three,
    minHeight: 250,
    padding: Spacing.three,
  },
  image: {
    height: 210,
    width: '100%',
  },
  imageFallback: {
    fontSize: 88,
    lineHeight: 190,
  },
  pokemonName: {
    marginTop: Spacing.three,
    textAlign: 'center',
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  typeBadge: {
    borderRadius: Spacing.five,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  stats: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.four,
    paddingTop: Spacing.three,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
    gap: Spacing.one,
  },
  statDivider: {
    height: 36,
    width: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: Spacing.five,
    justifyContent: 'center',
    marginTop: Spacing.three,
    minHeight: 52,
    paddingHorizontal: Spacing.four,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonText: {
    color: '#ffffff',
    letterSpacing: 1,
  },
  attribution: {
    marginTop: Spacing.three,
    textAlign: 'center',
  },
});
