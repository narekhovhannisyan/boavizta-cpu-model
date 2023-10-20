/**
 * Base interface for impact models.
 */
export interface IImpactModelInterface {
  modelIdentifier(): string;

  configure(
    name: string,
    staticParams: object | undefined
  ): Promise<IImpactModelInterface>;

  authenticate(authParams: object): void;

  calculate(observations: object | object[] | undefined): Promise<any[]>;
}
